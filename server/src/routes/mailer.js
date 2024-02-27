const router = require("express").Router();
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

router.use(bodyParser.json());

const db_url = process.env.DATABASE_URL;

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  host: "a2plcpnl0454.prod.iad2.secureserver.net",
  port: 587,
  secure: false,
  auth: {
    user: process.env.AUTH_USER,
    pass: process.env.AUTH_PASSWORD,
  },
});

router.post("/send-email", (req, res) => {
  let mailOptions = {
    from: req.body.email, // Sender address
    to: "contactus@bharatcorporateleague.com", // List of recipients
    subject: req.body.subject,
    text: `Name : ${req.body.name}\nEmail : ${req.body.email}\nNumber : ${req.body.number}\nMessage : ${req.body.message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send({ message: "Error sending email", error });
    }
    res.status(200).send({ message: "Email successfully sent", info });
  });
});

module.exports = router;
