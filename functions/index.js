const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")('sk_test_51LmdxIKpyoSfhizsPM2X4WvOBOu11wqd6qWKlim7bE8kE32eQB5Z3Wt7kxEnH5f5L5SV2kdG6PXxci4x5cXUUGZN00BCJfrnoU');

// API

// - App config
const app = express();

// - Middlewares
app.use(cors({origin: true}));
app.use(express.json());

// - API routes
app.get('/', (request, response) => response.status(200).send('hello world'))

app.post('/payments/create', async (request, response) => {
    const total = Math.round(request.query.total);
    
    console.log('Payment Request Received BOOM!! for this amount >>>', total);

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "eur"
    });

    // OK - created
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    });
})

// - Listen command
exports.api = functions.https.onRequest(app);

// Example endpoint
// http://localhost:5001/clone-7756a/us-central1/api

