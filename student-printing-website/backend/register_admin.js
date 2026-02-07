const fetch = require('node-fetch');

async function registerAdmin() {
    try {
        const response = await fetch('http://localhost:3000/api/admin/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: 'admin',
                password: 'admin123'
            })
        });
        const data = await response.json();
        console.log('Registration response:', data);
    } catch (error) {
        console.error('Error:', error);
    }
}

registerAdmin();
