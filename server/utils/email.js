import nodemailer from "nodemailer";
import config from "./config.js";

const transportObject = {
  host: config.NODE_MAILLER_HOST,
  port: 25,
  secure: false,
  auth: {
    user: config.NODE_MAILLER_USERNAME,
    pass: config.NODE_MAILLER_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
};

const transporter = nodemailer.createTransport(transportObject);

const sendMail = (bodyAsHtml, bodyAsText, to, subject) => {
  const mailOptions = {
    from: '"UASIS" <noreplay@bilengoz.com>',
    to, // list of receivers
    subject, // Subject line
    text: bodyAsText, // plain text body
    html: bodyAsHtml, // html body
  };

  // send mail with defined transport object
  return transporter.sendMail(mailOptions);
};

export { transporter, sendMail };
