// Student Print Hub - Backend Server
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const Admin = require('./models/Admin');
const Razorpay = require('razorpay');
const crypto = require('crypto');
require('dotenv').config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Razorpay
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Middleware
app.use(cors()); // Enable CORS for frontend communication
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Serve static files (uploaded files)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/student_print_hub';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('✅ Connected to MongoDB successfully');
    })
    .catch((error) => {
        console.error('❌ MongoDB connection error:', error);
    });

// Order Schema
const orderSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: true,
        trim: true
    },
    rollNumber: {
        type: String,
        required: true,
        trim: true
    },
    collegeName: {
        type: String,
        required: true,
        trim: true
    },
    subject: {
        type: String,
        required: true,
        trim: true
    },
    practicalNumber: {
        type: String,
        required: true,
        trim: true
    },
    teacherName: {
        type: String,
        required: true,
        trim: true
    },
    mobileNumber: {
        type: String,
        required: true,
        trim: true,
        match: /^[0-9]{10}$/ // Validate 10-digit mobile number
    },
    fileName: {
        type: String,
        default: null
    },
    filePath: {
        type: String,
        default: null
    },
    // Quote Details
    pages: {
        type: Number,
        default: 0
    },
    printType: {
        type: String,
        enum: ['bw', 'color'],
        default: 'bw'
    },
    binding: {
        type: Boolean,
        default: false
    },
    urgent: {
        type: Boolean,
        default: false
    },
    notes: {
        type: String,
        default: '',
        trim: true
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'completed', 'cancelled'],
        default: 'pending'
    },
    orderId: {
        type: String,
        unique: true
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: 'pending'
    },
    paymentId: {
        type: String,
        default: null
    },
    paymentMethod: {
        type: String,
        enum: ['online', 'cod'],
        default: 'online'
    },
    amount: {
        type: Number,
        default: 0
    },
    orderDate: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Pre-save hook to generate unique Order ID
orderSchema.pre('save', async function (next) {
    if (!this.orderId) {
        // Generate Order ID (Format: SPH-YYYYMMDD-XXXX)
        const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        const random = Math.floor(1000 + Math.random() * 9000);
        this.orderId = `SPH-${date}-${random}`;
    }
    next();
});

// Create Order model
const Order = mongoose.model('Order', orderSchema);

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // Files will be stored in uploads folder
    },
    filename: function (req, file, cb) {
        // Generate unique filename with timestamp
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// File filter to allow only specific file types
const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain'
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only PDF, DOC, DOCX, and TXT files are allowed.'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB file size limit
    }

});

// Email Transporter Configuration
const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use other services
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Authentication Middleware
const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.admin = await Admin.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

// Routes

// Health check route
app.get('/', (req, res) => {
    res.json({
        message: 'Student Print Hub API is running!',
        status: 'success',
        timestamp: new Date().toISOString()
    });
});

// --- Payment Routes ---

// POST /api/payment/create - Create Razorpay Order
app.post('/api/payment/create', async (req, res) => {
    try {
        const { amount } = req.body;

        const options = {
            amount: amount * 100, // Amount in paise
            currency: 'INR',
            receipt: 'receipt_' + Date.now()
        };

        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        console.error('Razorpay Error:', error);
        res.status(500).json({ message: 'Something went wrong with payment creation' });
    }
});

// POST /api/payment/verify - Verify Payment Signature
app.post('/api/payment/verify', async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, order_db_id } = req.body;

        const sign = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest('hex');

        if (razorpay_signature === expectedSign) {
            // Update order status in database
            if (order_db_id) {
                await Order.findByIdAndUpdate(order_db_id, {
                    paymentStatus: 'paid',
                    paymentId: razorpay_payment_id
                });
            }
            res.json({ success: true, message: 'Payment verified successfully' });
        } else {
            res.status(400).json({ success: false, message: 'Invalid signature' });
        }
    } catch (error) {
        console.error('Payment Verification Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// --- Tracking Route ---

// GET /api/orders/track/:orderId - Track Order Status
app.get('/api/orders/track/:orderId', async (req, res) => {
    try {
        const order = await Order.findOne({ orderId: req.params.orderId })
            .select('orderId status orderDate studentName subject'); // Select limited fields for privacy

        if (order) {
            res.json({ success: true, data: order });
        } else {
            res.status(404).json({ success: false, message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /api/order - Create new order
app.post('/api/order', upload.single('fileUpload'), async (req, res) => {
    try {
        console.log('--- New Order Request ---');
        console.log('Body:', req.body);
        console.log('File:', req.file ? req.file.originalname : 'No file');

        const {
            studentName,
            rollNumber,
            collegeName,
            subject,
            practicalNumber,
            teacherName,
            mobileNumber,
            notes,
            pages,
            printType,
            binding,
            urgent,
            paymentMethod
        } = req.body;

        // Validate required fields
        if (!studentName || !rollNumber || !collegeName || !subject ||
            !practicalNumber || !teacherName || !mobileNumber) {
            console.warn('Validation Failed: Missing required fields');
            return res.status(400).json({
                success: false,
                message: 'All required fields must be provided'
            });
        }

        // Validate mobile number format
        if (!/^[0-9]{10}$/.test(mobileNumber)) {
            console.warn('Validation Failed: Invalid mobile number');
            return res.status(400).json({
                success: false,
                message: 'Mobile number must be 10 digits'
            });
        }

        // Calculate calculatedAmount on backend
        let calculatedAmount = 0;
        const pageCount = parseInt(pages) || 0;
        const rate = printType === 'color' ? 5 : 2;
        calculatedAmount += pageCount * rate;

        // Handle checkboxes (Multipart/form-data sends "on" or undefined)
        const isBinding = binding === 'on' || binding === 'true' || binding === true;
        const isUrgent = urgent === 'on' || urgent === 'true' || urgent === true;

        if (isBinding) calculatedAmount += 30;
        if (isUrgent) calculatedAmount += 20;
        if (calculatedAmount === 0) calculatedAmount = 1;

        // Create order object
        const orderData = {
            studentName,
            rollNumber,
            collegeName,
            subject,
            practicalNumber,
            teacherName,
            mobileNumber,
            notes: notes || '',
            pages: pageCount,
            printType: printType || 'bw',
            binding: isBinding,
            urgent: isUrgent,
            amount: calculatedAmount,
            paymentMethod: paymentMethod || 'online'
        };

        // If COD, set payment status to pending (default) or handle accordingly
        if (paymentMethod === 'cod') {
            orderData.paymentStatus = 'pending';
        }

        // Add file information if uploaded
        if (req.file) {
            orderData.fileName = req.file.originalname;
            orderData.filePath = req.file.path;
        }

        const newOrder = new Order(orderData);
        const savedOrder = await newOrder.save();
        console.log('Order Saved Successfully:', savedOrder.orderId);

        console.log('📝 New order created:', savedOrder._id);

        // Send Email Notification to Admin
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.BUSINESS_EMAIL,
            subject: `🖨️ New Print Order: ${studentName}`,
            html: `
                <h2>New Printing Order Received</h2>
                <p><strong>Student:</strong> ${studentName}</p>
                <p><strong>Roll No:</strong> ${rollNumber}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Mobile:</strong> ${mobileNumber}</p>
                <p><strong>File:</strong> ${req.file ? req.file.originalname : 'No file uploaded'}</p>
                <p><strong>Notes:</strong> ${notes || 'None'}</p>
                <br>
                <p>Login to admin dashboard to view details.</p>
            `
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error('❌ Error sending email:', err);
            } else {
                console.log('📧 Email notification sent:', info.response);
            }
        });

        // Send success response
        res.status(201).json({
            success: true,
            message: 'Order submitted successfully!',
            orderId: savedOrder._id,
            data: {
                studentName: savedOrder.studentName,
                rollNumber: savedOrder.rollNumber,
                subject: savedOrder.subject,
                practicalNumber: savedOrder.practicalNumber,
                status: savedOrder.status,
                orderDate: savedOrder.orderDate
            }
        });

    } catch (error) {
        console.error('❌ Error creating order:', error);

        // Handle specific errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Validation error: ' + error.message
            });
        }

        if (error.message.includes('Invalid file type')) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }

        res.status(500).json({
            success: false,
            message: 'Internal server error. Please try again later.'
        });
    }
});

// --- Admin Routes ---

// POST /api/admin/register - Register a new admin (First time setup)
app.post('/api/admin/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const adminExists = await Admin.findOne({ username });
        if (adminExists) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        const admin = await Admin.create({ username, password });

        if (admin) {
            res.status(201).json({
                _id: admin._id,
                username: admin.username,
                token: generateToken(admin._id)
            });
        } else {
            res.status(400).json({ message: 'Invalid admin data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /api/admin/login - Admin Login
app.post('/api/admin/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await Admin.findOne({ username });

        if (admin && (await admin.matchPassword(password))) {
            res.json({
                _id: admin._id,
                username: admin.username,
                token: generateToken(admin._id)
            });
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

// PUT /api/orders/:id/status - Update order status (Protected)
app.put('/api/orders/:id/status', protect, async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findById(req.params.id);

        if (order) {
            order.status = status;
            const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE /api/orders/:id - Delete order (Protected)
app.delete('/api/orders/:id', protect, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (order) {
            await Order.deleteOne({ _id: req.params.id });
            res.json({ message: 'Order removed' });
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET /api/orders - Get all orders (Protected)
app.get('/api/orders', protect, async (req, res) => {
    try {
        // Get query parameters for filtering and pagination
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const status = req.query.status;
        const skip = (page - 1) * limit;

        // Build filter object
        const filter = {};
        if (status) {
            filter.status = status;
        }

        // Get orders with pagination
        const orders = await Order.find(filter)
            .sort({ createdAt: -1 }) // Sort by newest first
            .skip(skip)
            .limit(limit);

        // Get total count for pagination
        const totalOrders = await Order.countDocuments(filter);
        const totalPages = Math.ceil(totalOrders / limit);

        res.json({
            success: true,
            data: orders,
            pagination: {
                currentPage: page,
                totalPages: totalPages,
                totalOrders: totalOrders,
                hasNext: page < totalPages,
                hasPrev: page > 1
            }
        });

    } catch (error) {
        console.error('❌ Error fetching orders:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching orders'
        });
    }
});

// GET /api/admin - Simple admin dashboard (HTML)
app.get('/api/admin', async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 }).limit(50);

        let html = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Admin Dashboard - Student Print Hub</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                table { border-collapse: collapse; width: 100%; }
                th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                th { background-color: #f2f2f2; }
                .status-pending { color: orange; }
                .status-processing { color: blue; }
                .status-completed { color: green; }
                .status-cancelled { color: red; }
            </style>
        </head>
        <body>
            <h1>Student Print Hub - Admin Dashboard</h1>
            <p>Total Orders: ${orders.length}</p>
            <table>
                <tr>
                    <th>Order ID</th>
                    <th>Student Name</th>
                    <th>Roll Number</th>
                    <th>College</th>
                    <th>Subject</th>
                    <th>Practical #</th>
                    <th>Teacher</th>
                    <th>Mobile</th>
                    <th>File</th>
                    <th>Status</th>
                    <th>Date</th>
                </tr>
        `;

        orders.forEach(order => {
            html += `
                <tr>
                    <td>${order._id}</td>
                    <td>${order.studentName}</td>
                    <td>${order.rollNumber}</td>
                    <td>${order.collegeName}</td>
                    <td>${order.subject}</td>
                    <td>${order.practicalNumber}</td>
                    <td>${order.teacherName}</td>
                    <td>${order.mobileNumber}</td>
                    <td>${order.fileName || 'No file'}</td>
                    <td class="status-${order.status}">${order.status}</td>
                    <td>${new Date(order.createdAt).toLocaleString()}</td>
                </tr>
            `;
        });

        html += `
            </table>
        </body>
        </html>
        `;

        res.send(html);

    } catch (error) {
        console.error('❌ Error in admin dashboard:', error);
        res.status(500).send('Error loading admin dashboard');
    }
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('❌ Unhandled error:', error);

    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                success: false,
                message: 'File size too large. Maximum size is 10MB.'
            });
        }
    }

    res.status(500).json({
        success: false,
        message: 'Something went wrong!'
    });
});

// Handle 404 routes
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log(`📊 Admin dashboard: http://localhost:${PORT}/api/admin`);
    console.log(`📁 Uploads folder: ${path.join(__dirname, 'uploads')}`);
});