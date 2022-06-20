require('dotenv').config();
const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_SECRET_ID,
    process.env.GOOGLE_REDIRECT_URL
);

const code = '4/0AX4XfWhYix5BtWs-0bpMNomrM_vJVlXI0k_gtHrrIZ-EoEpaw9ThtgUjUX0fVdnWrb0XTA';

// Generate a url that asks permissions for Gmail scopes
const GMAIL_SCOPES = [
    'https://mail.google.com/',
    'https://www.googleapis.com/auth/gmail.modify',
    'https://www.googleapis.com/auth/gmail.compose',
    'https://www.googleapis.com/auth/gmail.send',
];


const getUrl = async() => {
    const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: GMAIL_SCOPES,
    });
    console.log(url);
}

const getToken = async() => {
    const { tokens } = await oauth2Client.getToken(code);
    console.log(tokens);
};

module.exports = {
    getToken,
    getUrl
}