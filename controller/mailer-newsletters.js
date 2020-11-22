const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const hbs = require('nodemailer-express-handlebars');

const oauth2Client = new OAuth2(
   "199889101180-2rg32t72psu0g8tvp5opeuubbh8qf2ih.apps.googleusercontent.com", // ClientID
   "-8IpbCwn8rEjox5gvHXebGx1", // Client Secret
   "https://developers.google.com/oauthplayground" // Redirect URL
);

oauth2Client.setCredentials({
   refresh_token: "1//04WmbGT6goWVaCgYIARAAGAQSNwF-L9Ir7wdGPXSY_K0OVu5alYClXCxWikJ1syLGot6ASjEAzGesmHAG3AVasvdosTo4IMCAyYo"
});

const accessToken = oauth2Client.getAccessToken()

// =============


function mailer(user) {

   const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
         user: 'laguna.sup.dreams@gmail.com',
         type: "OAuth2",
         clientId: "199889101180-2rg32t72psu0g8tvp5opeuubbh8qf2ih.apps.googleusercontent.com",
         clientSecret: "-8IpbCwn8rEjox5gvHXebGx1",
         refreshToken: "1//04WmbGT6goWVaCgYIARAAGAQSNwF-L9Ir7wdGPXSY_K0OVu5alYClXCxWikJ1syLGot6ASjEAzGesmHAG3AVasvdosTo4IMCAyYo",
         accessToken: accessToken
      },
      tls: {
         rejectUnauthorized: false
      }
   });


   transporter.use('compile', hbs({
      viewEngine : {
         extname: '.handlebars', // handlebars extension
         layoutsDir: 'views/', // location of handlebars templates
         defaultLayout: 'welcome-newsletters', // name of main template
         partialsDir: 'views/', // location of your subtemplates aka. header, footer etc
     },
     viewPath: 'views/',
     extName: '.handlebars'
   }));

   var mailOptions = {
      from: 'laguna.sup.dreams@gmail.com',
      to: user.email,
      subject: "Welcome to Grooove's Monthly Newsletter",
      generateTextFromHTML: true,
      template: "welcome-newsletters"
   };

   transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
         console.log(error);
      } else {
         console.log('Email sent: ' + info.response);
      }
   });
}

module.exports = mailer;

