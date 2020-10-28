const nodemailer = require("nodemailer");
const email = "faizanqureshi1231998@gmail.com";
const pass = "qureshi_learner";

function sendMail(to, user, id) {
  // let testAccount = await nodemailer.createTestAccount();
  console.log(email);
  console.log(pass);
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    secure: true,
    auth: {
      user: email, //replace with your email
      pass: pass, //replace with your password
    },
  });

  let mailOptions = {
    from: email, //replace with your email
    to: to, //replace with your email
    subject: `HN Algolia Password Recovery`,
    html: `<h1>${user}</h1>
    <h3>Someone (hopefully you) requested we reset your password for ${user} at HN Algolia.</h3>
    <h4>If you want to change it, please visit <br/> <a href="http://localhost:3000/auth/resetPassword?_id=${id}" rel="noopener noreferrer"
    target="_blank">click here</a> to reset your password.</h4>
    <br>
    <p>If not, just ignore this message.</p>
    <h4>Regards : <a href="http://localhost:3000/" rel="noopener noreferrer"
    target="_blank">HN Algolia</a></h4> <br>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      //res.send("error"); // if error occurs send error as response to client
    } else {
      console.log("Email sent: " + info.response);
      //res.send("Sent Successfully"); //if mail is sent successfully send Sent successfully as response
    }
  });
}

module.exports = { sendMail };
