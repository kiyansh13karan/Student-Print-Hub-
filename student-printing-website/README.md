# Student Print Hub 🖨️

A complete student-focused online printing website where students can order printed practical files, assignments, and notes. Built with vanilla HTML, CSS, JavaScript frontend and Node.js/Express backend with MongoDB.

## 🚀 Features

### Frontend
- **Clean & Responsive Design**: Mobile-first approach with modern UI
- **Multiple Pages**: Home, Templates, Order Form, Contact
- **Order Form**: Complete form with validation for student details
- **File Upload**: Optional file upload for custom documents
- **WhatsApp Integration**: Quick contact button
- **Form Validation**: Real-time JavaScript validation

### Backend
- **REST API**: Express.js server with proper error handling
- **File Upload**: Multer integration for handling file uploads
- **MongoDB Storage**: Persistent data storage with Mongoose
- **Admin Dashboard**: Simple HTML dashboard to view orders
- **CORS Enabled**: Frontend-backend communication

### Order Management
- Student details collection (Name, Roll Number, College, etc.)
- Subject selection with dropdown
- File upload support (PDF, DOC, DOCX, TXT)
- Order status tracking
- Admin order viewing

## 📁 Project Structure

```
student-printing-website/
├── frontend/
│   ├── index.html          # Home page
│   ├── templates.html      # Templates showcase
│   ├── order.html          # Order form
│   ├── contact.html        # Contact information
│   ├── styles.css          # All CSS styles
│   └── script.js           # JavaScript functionality
├── backend/
│   ├── server.js           # Main server file
│   ├── package.json        # Dependencies
│   ├── .env               # Environment variables
│   └── uploads/           # File upload directory
└── README.md              # This file
```

## 🛠️ How to Run in VS Code (Step-by-Step)

### Prerequisites
- **Node.js**: Install from [nodejs.org](https://nodejs.org/) (Download LTS version)
- **VS Code**: Install from [code.visualstudio.com](https://code.visualstudio.com/)

### Step 1: Open the Project
1. Open VS Code.
2. Go to **File** > **Open Folder...**
3. Select the `student-printing-website` folder.

### Step 2: Open Integrated Terminals
You need TWO terminals running at the same time: one for the Backend and one for the Frontend.

1. **Terminal 1 (Backend)**:
   - Go to top menu **Terminal** > **New Terminal**.
   - Type these commands:
     ```bash
     cd backend
     npm start
     ```
   - You should see: `🚀 Server is running on http://localhost:3000`

2. **Terminal 2 (Frontend)**:
   - Click the `+` icon or split terminal icon in the terminal panel to open a second terminal.
   - Type these commands:
     ```bash
     cd frontend
     npx http-server -p 5500
     ```
   - You should see: `Available on: http://127.0.0.1:5500`

### Step 3: Open in Browser
- **Student View**: Open [http://localhost:5500](http://localhost:5500)
- **Admin Dashboard**: Open [http://localhost:5500/admin/login.html](http://localhost:5500/admin/login.html)


## 🔧 Configuration

### Backend Configuration (.env file)
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/student_print_hub
MAX_FILE_SIZE=10485760
FRONTEND_URL=http://localhost:5500
WHATSAPP_NUMBER=1234567890
```

### MongoDB Setup Options

#### Option 1: Local MongoDB
1. Install MongoDB Community Edition
2. Start MongoDB service
3. Use default connection: `mongodb://localhost:27017/student_print_hub`

#### Option 2: MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env` file

## 📊 API Endpoints

### POST /api/order
Submit a new printing order
```json
{
  "studentName": "John Doe",
  "rollNumber": "CS001",
  "collegeName": "ABC College",
  "subject": "Computer Science",
  "practicalNumber": "Practical 1",
  "teacherName": "Prof. Smith",
  "mobileNumber": "1234567890",
  "notes": "Optional notes",
  "fileUpload": "file (optional)"
}
```

### GET /api/orders
Get all orders (Admin)
- Query parameters: `page`, `limit`, `status`

### GET /api/admin
Admin dashboard (HTML view)

## 🎯 Usage Instructions

### For Students:
1. Visit the website homepage
2. Browse available templates (optional)
3. Click "Order Now" or navigate to order page
4. Fill out the complete order form:
   - Personal details (Name, Roll Number, College)
   - Academic details (Subject, Practical Number, Teacher)
   - Contact information (Mobile Number)
   - Upload file (optional)
   - Add special notes (optional)
5. Submit the order
6. Receive confirmation message
7. Contact via WhatsApp for updates

### For Admin:
1. Visit `http://localhost:3000/api/admin`
2. View all submitted orders
3. Check order details and files
4. Process orders manually
5. Update customers via phone/WhatsApp

## 🔍 Testing the Application

### Test Order Submission:
1. Open frontend in browser
2. Navigate to Order page
3. Fill form with test data:
   ```
   Student Name: Test Student
   Roll Number: TEST001
   College: Test College
   Subject: Computer Science
   Practical Number: 1
   Teacher: Test Teacher
   Mobile: 9876543210
   ```
4. Submit form
5. Check admin dashboard for new order
6. Verify file upload (if used)

### Test File Upload:
- Create a test PDF/DOC file
- Upload via order form
- Check `backend/uploads/` directory
- Verify file appears in admin dashboard

## 🚨 Troubleshooting

### Common Issues:

#### Backend won't start:
- Check if MongoDB is running
- Verify Node.js installation: `node --version`
- Check port 3000 availability
- Review error messages in terminal

#### Frontend can't connect to backend:
- Ensure backend is running on port 3000
- Check CORS configuration
- Verify API URL in `script.js`
- Check browser console for errors

#### File upload fails:
- Check file size (max 10MB)
- Verify file type (PDF, DOC, DOCX, TXT only)
- Ensure uploads directory exists
- Check file permissions

#### MongoDB connection issues:
- Verify MongoDB service is running
- Check connection string in `.env`
- For Atlas: verify network access and credentials

## 🔒 Security Notes

- No authentication implemented (as requested)
- File upload restricted to safe types
- File size limited to 10MB
- Input validation on both frontend and backend
- CORS configured for specific frontend URL

## 🚀 Deployment Options

### Local Development:
- Use provided setup instructions
- Perfect for testing and development

### Production Deployment:
- **Frontend**: Deploy to Netlify, Vercel, or GitHub Pages
- **Backend**: Deploy to Heroku, Railway, or DigitalOcean
- **Database**: Use MongoDB Atlas for cloud database
- Update CORS and API URLs for production domains

## 📱 Mobile Responsiveness

The website is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- All modern browsers

## 🎨 Customization

### Styling:
- Edit `frontend/styles.css` for design changes
- Modify color scheme in CSS variables
- Update fonts and spacing as needed

### Content:
- Update contact information in HTML files
- Modify WhatsApp number in all files
- Change business name and branding

### Functionality:
- Add new subjects in order form dropdown
- Modify validation rules in `script.js`
- Extend database schema in `server.js`

## 📞 Support

For technical support or questions:
- Email: karannayalkannu1982@gmail.com
- WhatsApp: +91 7830242564
- Owner: Karan Nayal
- Address: Old I.T.I Bareilly Road, Haldwani, Uttarakhand, Nainital
- Check admin dashboard for order status

## 📄 License

This project is open source and available under the MIT License.

---

**Built with ❤️ for students by Student Print Hub**