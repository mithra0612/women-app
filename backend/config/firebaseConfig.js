require("dotenv").config();
const admin = require("firebase-admin");
const fs = require("fs");

// Construct service account from environment variables
const serviceAccount = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') : undefined, // Fix newline issue
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
};

// Function to check if service account is valid
function isValidServiceAccount(account) {
  return account.project_id && account.private_key && account.client_email;
}

// Try using the environment variables first
if (isValidServiceAccount(serviceAccount)) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log("Using service account from environment variables.");
} else {
  console.warn("Environment variables for Firebase are incomplete or invalid. Falling back to serviceAccountKey.json.");

  const serviceAccountPath = process.env.SERVICE_ACCOUNT_PATH || "/etc/secrets/serviceAccountKey.json";

  if (fs.existsSync(serviceAccountPath)) {
    const fallbackServiceAccount = require(serviceAccountPath);
    admin.initializeApp({
      credential: admin.credential.cert(fallbackServiceAccount),
    });
    console.log("Using service account from file.");
  } else {
    throw new Error("No valid Firebase credentials found in environment variables or file.");
  }
}

const db = admin.firestore();

module.exports = { db };
