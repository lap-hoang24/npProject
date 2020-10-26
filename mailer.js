const nodemailer = require('nodemailer');


function mailer(user) {

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'lap.hoang.idi@gmail.com',
      pass: 'healWorldthe2491'
    }
  });
  
  var mailOptions = {
    from: 'lap.hoang.idi@gmail.com',
    to: user.email,
    subject: 'Sending Email using Node.js',
    html: "<a href='localhost:3000/users/change_password/" + user._id + "'> Get a new password </a>"
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

