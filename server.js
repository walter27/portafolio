require('dotenv').config();
const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const { getToken, getUrl } = require('./public/js/google_auth');

const app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.json());

app.get('/walter-remache', function(req, res) {
    res.sendFile(path.join(__dirname + '/pages/index.html'));
});

app.post('/', (req, res) => {
    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.GOOGLE_GMAIL_ADRESS,
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_SECRET_ID,
            refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
            accessToken: process.env.GOOGLE_ACCESS_TOKEN,
            expires: Number.parseInt(process.env.GOOGLE_EXPIRE_TOKEN, 10),
        },
    });

    const mailOptions = {
        from: req.body.email,
        to: process.env.GOOGLE_GMAIL_ADRESS,
        subject: 'Correo portafolio',
        text: req.body.message
    }

    transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.send('error');
        } else {
            res.send('success');
        }
    })
})

app.listen(process.env.PORT || 3000, () => {
    console.log("Server run in port ", process.env.PORT || 3000);
});