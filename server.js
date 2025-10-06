import express from "express";
import Stripe from "stripe";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

// ---------------- Stripe Setup ----------------
const stripe = new Stripe("sk_test_51S7vJkQu84Dxc6JSjWWmGWvEXasmf7CoxnajmyCXWs5R5Lcy1RGO7nrWkyDPErtisMgJczMxZA0jgNWWeQ5oQEAE00UTNqJBqy"); // your secret key
const webhookSecret = "whsec_1yGmBcmC3KZTSlfEBmelDtiaUkbRSOCE"; // Stripe webhook signing secret

// ---------------- Middleware ----------------
app.use(cors()); // optional, for browser requests

// ---------------- Webhook Route ----------------
app.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }), // ⚠️ Must be raw body for signature verification
  (req, res) => {
    const sig = req.headers["stripe-signature"];

    let event;
    try {
      // Verify webhook signature
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
      console.log("✅ Webhook verified:", event.type);
    } catch (err) {
      console.error("⚠️ Webhook signature verification failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle checkout.session.completed
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const orderId = session.metadata?.order_id || "N/A";
      const customerId = session.metadata?.customer_id || "N/A";
      const transactionId = session.payment_intent || "N/A";

      console.log("💰 Payment completed!");
      console.log("Order ID:", orderId);
      console.log("Customer ID:", customerId);
      console.log("Transaction I:", transactionId);

      // TODO: Update your database with payment info
    }

    res.status(200).json({ received: true });
  }
);

// ---------------- Start Server ----------------
const PORT = 5001;
app.listen(PORT, () => console.log(`Webhook server running on port ${PORT}`));

