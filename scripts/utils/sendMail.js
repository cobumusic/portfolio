import nodemailer from "nodemailer";

/**
 * asynchronous function to send an email.
 *
 * @param {string} to - The recipient's email address.
 * @param {string} replyTo - The email address that should be used when the recipient wants to reply.
 * @param {string} subject - The subject of the email.
 * @param {string} body - The HTML content of the email.
 * @returns {Promise} - Resolves when the email is successfully sent, or rejects with an error.
 */
export default async function sendMail(to, replyTo, subject, body) {
  return new Promise((resolve, reject) => {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        //Using environment variables for SMTP authentication to ensure the security of the credentials.
        user: process.env.SMTP_USER, //Email address used for sending emails.
        pass: process.env.SMTP_PASS, //App-specific password for the email address (see https://stackoverflow.com/questions/45478293/username-and-password-not-accepted-when-using-nodemailer).
      },
    });

    //send mail -- will automatically set from equal to the auth user above
    transporter.sendMail({
      to, //list of receivers
      subject, //subject line
      html: body, //html body
      replyTo,
    }, function(err, info) {
      if (err){
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
