module.exports = {
  type: "service_account",
  project_id: "pickem-597ad",
  private_key_id: process.env.PRIVATE_ID,
  private_key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
  client_email: "firebase-adminsdk-ssuf8@pickem-597ad.iam.gserviceaccount.com",
  client_id: "103577150708066651716",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ssuf8%40pickem-597ad.iam.gserviceaccount.com"
};
