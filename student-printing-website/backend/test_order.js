const http = require('http');

const boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW';
const body =
    `--${boundary}\r\nContent-Disposition: form-data; name="studentName"\r\n\r\nTest Student\r\n` +
    `--${boundary}\r\nContent-Disposition: form-data; name="rollNumber"\r\n\r\n12345\r\n` +
    `--${boundary}\r\nContent-Disposition: form-data; name="collegeName"\r\n\r\nTest College\r\n` +
    `--${boundary}\r\nContent-Disposition: form-data; name="subject"\r\n\r\nPhysics\r\n` +
    `--${boundary}\r\nContent-Disposition: form-data; name="practicalNumber"\r\n\r\n1\r\n` +
    `--${boundary}\r\nContent-Disposition: form-data; name="teacherName"\r\n\r\nDr. Test\r\n` +
    `--${boundary}\r\nContent-Disposition: form-data; name="mobileNumber"\r\n\r\n9876543210\r\n` +
    `--${boundary}--\r\n`;

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/order',
    method: 'POST',
    headers: {
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        'Content-Length': Buffer.byteLength(body)
    }
};

const req = http.request(options, (res) => {
    let responseBody = '';
    res.on('data', (chunk) => responseBody += chunk);
    res.on('end', () => {
        console.log('Status Code:', res.statusCode);
        console.log('Response Body:', responseBody);
    });
});

req.on('error', (error) => {
    console.error('Error:', error);
});

req.write(body);
req.end();
