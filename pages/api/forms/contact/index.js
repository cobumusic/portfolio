import sendMail from "/scripts/utils/sendMail.js";

export default async function handler(req, res) {
  let emailBody = "";

  for (const [key, value] of Object.entries(req.body)) {
    if (key !== "service"){
      emailBody += `<p>${key}: ${value.replace(/\n/g, "<br/>")}<p>`;
    }
  }

  emailBody += `<p>IP: ${req.headers["x-real-ip"] || req.connection.remoteAddress}<p>`;

  sendMail("jacobmugalde@gmail.com", req.body.email, `[Contact Request] ${req.body.service}`, emailBody)
    .then(() => {
      res.status(200).end();
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({err});
    });
}
