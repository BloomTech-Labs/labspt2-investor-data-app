const STRIPE_PUBLISHABLE =
  process.env.NODE_ENV === "production"
    ? "pk_test_7mDiIF0ntVgLJjKz6B7evL0i00J88bDjzD"
    : "pk_test_7mDiIF0ntVgLJjKz6B7evL0i00J88bDjzD";

export default STRIPE_PUBLISHABLE;
