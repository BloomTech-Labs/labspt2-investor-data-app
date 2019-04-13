const PAYMENT_SERVER_URL =
  process.env.NODE_ENV === "production"
    ? "https://pickemm.herokuapp.com/api/stripe"
    : "http://localhost:5000/api/stripe";

export default PAYMENT_SERVER_URL;
