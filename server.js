import express from "express";
import Stripe from "stripe";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const stripe = new Stripe("sk_test_..."); // your secret key here

// ✅ Enable CORS for all origins (optional for webhooks)
app.use(cors());

// ⚠️ Important: Stripe webhook requires raw body parser
app.post("/webhook", bodyParser.raw({ type: "application/json" }), (req, res) => {
  const sig = req.headers["stripe-signature"];
  const webhookSecret = "whsec_..."; // Stripe CLI signing secret

  let event;

  try {
    // Verify the webhook signature
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const orderId = session.metadata.order_id;
    const customerId = session.metadata.customer_id;
    const transactionId = session.payment_intent;

    console.log("✅ Payment completed!");
    console.log("Order ID:", orderId);
    console.log("Customer ID:", customerId);
    console.log("Transaction ID:", transactionId);

    // TODO: Update your database with payment info
  }

  res.status(200).json({ received: true });
});

app.listen(5001, () => console.log("Webhook server running on port 5001"));
