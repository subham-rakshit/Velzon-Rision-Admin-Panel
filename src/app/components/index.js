// Auth ---
import CommonAuthLayout from "./auth-component/CommonAuthLayout";

// Auth Input Fields --
import PasswordInputFiled from "./auth-component/PasswordInputFiled";
import TextInputFile from "./auth-component/TextInputFile";
import RememberMe from "./auth-component/RememberMe";

// Auth Froms --
import RegistrationForm from "./auth-component/register/RegistrationForm";
import VerifyAccount from "./auth-component/auth-towstep/VerifyAccount";
import LoginForm from "./auth-component/login/LoginForm";
import ForgotPasswordForm from "./auth-component/forgot-password/ForgotPasswordForm";
import ResetPasswordForm from "./auth-component/auth-pass-change/ResetPasswordFrom";
import ResendOtpForm from "./auth-component/auth-otp-resend/ResendOtpForm";
import AlternateAuthentication from "./auth-component/AlternateAuthentication";

// not-found page -->
import ErrorImage from "./ErrorImage";

// Auth Protected Pages -->
import AuthProtectedLayoutProvider from "./auth-protected-components/AuthProtectedLayoutProvider";
import LeftSidebar from "./auth-protected-components/LeftSidebar";
import LeftTwoColumnSidebar from "./auth-protected-components/LeftTwoColumnSidebar";

//NOTE Navbar components
import Navbar from "./auth-protected-components/navbar/Navbar";
import ToggleButton from "./auth-protected-components/navbar/ToggleButton";
import NavSearchBox from "./auth-protected-components/navbar/NavSearchBox";
import NavSearchBoxRecentSearches from "./auth-protected-components/navbar/NavSearchBoxRecentSearches";
import NavbarLanguages from "./auth-protected-components/navbar/NavbarLanguages";
import NavbarWebApps from "./auth-protected-components/navbar/NavbarWebApps";
import NavbarMyCart from "./auth-protected-components/navbar/NavbarMyCart";
import NavFullScreenToggleButton from "./auth-protected-components/navbar/NavFullScreenToggleButton";
import NavbarThemeSwitcher from "./auth-protected-components/navbar/NavbarThemeSwitcher";
import NavbarNotification from "./auth-protected-components/navbar/NavbarNotification";

import RightSidebar from "./auth-protected-components/RightSidebar";
import Footer from "./auth-protected-components/Footer";

export {
  CommonAuthLayout,
  PasswordInputFiled,
  TextInputFile,
  RememberMe,
  AlternateAuthentication,
  RegistrationForm,
  VerifyAccount,
  LoginForm,
  ForgotPasswordForm,
  ResetPasswordForm,
  ResendOtpForm,
  ErrorImage,
  AuthProtectedLayoutProvider,
  LeftSidebar,
  LeftTwoColumnSidebar,
  RightSidebar,
  Navbar,
  ToggleButton,
  NavSearchBox,
  NavSearchBoxRecentSearches,
  NavbarLanguages,
  NavbarWebApps,
  NavbarMyCart,
  NavFullScreenToggleButton,
  NavbarThemeSwitcher,
  NavbarNotification,
  Footer,
};
