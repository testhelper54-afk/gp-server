
// const express = require('express');
// const axios = require('axios');
// const crypto = require('crypto');
// const cors = require('cors');

// const app = express();
// const PORT = 5000;

// app.use(cors({
//   origin: 'http://localhost:5174', // your React app URL, change if needed
//   methods: ['GET', 'POST']
// }));
// app.use(express.json());

// const APP_ID = 'AXjAtpxBcvNbJrE0NL47ooElTNAOsRTX';
// const APP_KEY = 'JLznah5LU9o5beoV';

// // Simple in-memory store for webhook events
// let webhookEvents = [];

// function generateSecret(nonce, appKey) {
//   return crypto
//     .createHash('sha512')
//     .update(nonce + appKey)
//     .digest('hex');
// }

// app.get('/get-token', async (req, res) => {
//   const nonce = new Date().toISOString();
//   const secret = generateSecret(nonce, APP_KEY);

//   try {
//     const response = await axios.post(
//       'https://apis.sandbox.globalpay.com/ucp/accesstoken',
//       {
//         app_id: APP_ID,
//         nonce,
//         secret,
//         grant_type: 'client_credentials',
//       },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           'X-GP-Version': '2021-03-22',
//           Accept: 'application/json',
//         },
//       }
//     );
//     res.json(response.data);
//   } catch (error) {
//     console.error('Token error:', error.response?.data || error.message);
//     res.status(500).json({ error: 'Failed to generate token' });
//   }
// });

// async function getAccessToken() {
//   const nonce = new Date().toISOString();
//   const secret = generateSecret(nonce, APP_KEY);

//   const tokenRes = await axios.post(
//     'https://apis.sandbox.globalpay.com/ucp/accesstoken',
//     {
//       app_id: APP_ID,
//       nonce,
//       secret,
//       grant_type: 'client_credentials',
//     },
//     {
//       headers: {
//         'Content-Type': 'application/json',
//         'X-GP-Version': '2021-03-22',
//         Accept: 'application/json',
//       },
//     }
//   );
//   return tokenRes?.data?.token;
// }

// app.post('/generate', async (req, res) => {
//   try {
//     const token = await getAccessToken();

//     const body = {
//       account_name: "transaction_processing",
//       type: "HOSTED_PAYMENT_PAGE",
//       name: "HPP Demo Transaction",
//       description: "HPP transaction from Demo Site",
//       reference: "HPP_TXN_36680861",
//       payer: {
//          status: "ACTIVE",
//         // name: "James Mason",
//         // first_name: "James",
//         // last_name: "Mason",
//         // language: "en",
//         email: "jamesmason@example.com",
//         // mobile_phone: {
//         //   country_code: "44",
//         //   subscriber_number: "1801555888"
//         // },
//         billing_address: {
         
//           country: "GB"
//         }
//       },
//       order: {
//         amount: "20000",
//         currency: "EUR",
//         reference: "order-366808",
//         transaction_configuration: {
//           channel: "CNP",
//           country: "IE",
//           capture_mode: "AUTO",
//           allowed_payment_methods: ["CARD"],
//           currency_conversion_mode: "NO"
//         },
//         payment_method_configuration: {
//           authentications: {
//             preference: "CHALLENGE_MANDATED"
//           },
//           status: "ACTIVE",
//           storage_mode: "PROMPT"
//         }
//       },
//       notifications: {
//          return_url: "https://www.google.com",
//       }
//     };

//     const linkRes = await axios.post(
//       'https://apis.sandbox.globalpay.com/ucp/links',
//       body,
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           'X-GP-Version': '2021-03-22',
//           Authorization: `Bearer ${token}`,
//           Accept: 'application/json'
//         }
//       }
//     );

//     res.json(linkRes.data);
//   } catch (error) {
//     console.error('Link generation error:', error.response?.data || error.message);
//     res.status(500).json({ error: 'Failed to generate link' });
//   }
// });

// app.post('/webhook', (req, res) => {
//   console.log('Webhook received:', req.body);
//   webhookEvents.push(req.body); // store webhook event
//   res.status(200).send('OK');
// });

// app.get('/webhook-data', (req, res) => {
//   res.json({title:'hello world'});
// });

// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });
// const express = require("express");
// const serverless = require("serverless-http");

// const app = express();

// app.get("/", (req, res) => {
//   res.send("Hello from AWS Lambda!");
// });

// app.get("/users", (req, res) => {
//   res.json([{ id: 1, name: "John Doe" }]);
// });

// // Export Lambda handler
// module.exports.handler = serverless(app);


// index.js
const express = require("express");
const cors = require("cors");

const app = express();

// Enable CORS for all origins (you can restrict if needed)
app.use(cors());

// Define GET API
app.get("/transaction", (req, res) => {
  res.json({
    id: "TRN_H6EZtYEMD41ffTHVYxZyQL7_tion53044871",
    time_created: "2025-09-15T11:18:36.709Z",
    type: "SALE",
    status: "CAPTURED",
    channel: "CNP",
    capture_mode: "AUTO",
    amount: "20000",
    currency: "USD",
    country: "US",
    merchant_id: "MER_5be817cbbd1a4a508abb5d013584a0c5",
    merchant_name: "demosite_merchant",
    account_id: "TRA_9da3fe4227cc45398eb1eb682d911275",
    account_name: "transaction_processing_hpp",
    reference: "order-53044871",
    payment_method: {
      id: "",
      result: "00",
      message: "[ test system ] AUTHORISED",
      entry_mode: "ECOM",
      authentication: {
        three_ds: {
          value_result: "AJkBApMwKQAAAE4ghAJYdQAAAAA=",
        },
      },
    },
    link_data: {
      id: "LNK_H6EZtYEMD41ffTHVYxZyQL7koTon0b",
      url: "https://apis.sandbox.globalpay.com/ucp/hpp/redirect/f448e446-e744-4697-b07d-84ea65d0b847",
      status: "ACTIVE",
      type: "HOSTED_PAYMENT_PAGE",
      allowed_payment_methods: ["CARD"],
      usage_mode: "SINGLE",
      usage_count: "1",
      reference: "Hosted Payment Page transaction 53044871",
      name: "HPP Demo Transaction",
      description: "HPP transaction from Demo Site",
      viewed_count: "0",
      expiration_date: "2025-09-16T11:18:14.271Z",
      images: [],
      notifications: {
        return_url: "https://demo.globalpay.com/api/hpp/notifications",
        status_url: "https://demo.globalpay.com/api/hpp/notifications",
        cancel_url: "",
      },
    },
    action: {
      id: "ACT_ujh5dKMUebkJ44ekwz1uOP4xt2Xehr",
      type: "STATUS_NOTIFICATION",
      time_created: "2025-09-15T11:18:36.709Z",
      result_code: "SUCCESS",
      app_id: "IsCDJwZTFYMnFoJQjM653qfCuY05264q",
      app_name: "demosite_merchant",
    },
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
