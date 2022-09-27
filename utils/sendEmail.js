import AWS from 'aws-sdk';
import catchAsync from '../utils/catchAsync.js';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_SES_REGION,
});

const ses = new AWS.SES({
  apiVersion: '2010-12-01',
});

export const sendEmailOnRegister = catchAsync(async (email, firstname, res) => {
  // send welcome email
  const params = {
    Source: process.env.EMAIL_FROM,
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: `<html><body><p>Hello ${firstname}, you are now the member of one of the best learnr's community.</p></body></html>`
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Welcome to Learnr',
      },
    },
  };
  console.log('sending email...');
  ses.sendEmail(params).promise().then(() => console.log("Email sent successfully."));
});