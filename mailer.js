const nodemailer = require('nodemailer');


function mailer(user) {

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'laguna.sup.dreams@gmail.com',
      pass: '@Rolly0605'
    }
  });
  
  var mailOptions = {
    from: 'laguna.sup.dreams@gmail.com',
    to: user.email,
    subject: 'Sending Email using Node.js',
    html: "<a href='https://grooove.herokuapp.com/users/change_password/" + user._id + "'> Get a new password </a>"
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = mailer;

