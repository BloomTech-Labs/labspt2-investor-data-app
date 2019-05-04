module.exports = {
  type: process.env.REACT_APP_TYPE,
  project_id: process.env.REACT_APP_PROJECT_ID,
  private_key_id: process.env.REACT_APP_PRIVATE_ID,
  private_key: process.env.REACT_APP_PRIVATE_KEY.replace(/\\n/g, "\n"),
  client_email: process.env.REACT_APP_CLIENT_EMAIL,
  client_id: process.env.REACT_APP_CLIENT_ID,
  auth_uri: process.env.REACT_APP_AUTH_URI,
  token_uri: process.env.REACT_APP_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.REACT_APP_AUTH_PROVIDER,
  client_x509_cert_url: process.env.REACT_APP_CLIENT_URL
};
