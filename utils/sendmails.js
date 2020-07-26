const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMessage = (msg) => {
  return new Promise(async (resolve, reject) => {
    try {
      const cbVal = await sgMail.send(msg);
      resolve(cbVal);
    } catch (error) {
      console.error(error);
      if (error.response) {
        reject(error.response.body);
      }
    }
  });
};

module.exports = {
  sendMessage,
};
