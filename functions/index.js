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
app.get('/', (request, response) => res.status(200).send('hellow world'))

// - Listen command
exports.api = functions.https.onRequest(app);
