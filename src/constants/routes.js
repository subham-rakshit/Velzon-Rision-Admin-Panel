const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  AUTH_TWO_STEP: "/auth-twostep",
  AUTH_OTP_RESEND: "/auth-otp-resend",

  // Dynamic Routes
  AUTH_PASS_CHANGE: (token) => `/auth-pass-change/${token}`,
};

export default ROUTES;
