import nodemailer, { TransportOptions } from 'nodemailer';
import config from '../../config';


export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com.",
    port: 465,
    secure: config.NODE_ENV === 'production',
    auth: {
      user: "mraburayhan66@gmail.com",
      pass: config.email_app_pass,
    },
  } as TransportOptions);

  const mailData = {
    from: {
      name: 'Dish-Directory',
      address: "mraburayhan66@gmail.com" as string,
    },

    to,
    subject: 'Reset your password within ten minutes!',
    text: '',
    html,
  };

  await new Promise((resolve, reject) => {
    transporter.sendMail(mailData, (err, info) => {
      if (err) {
        reject(err);
      } else {
        resolve(info);
      }
    });
  });
};