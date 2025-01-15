import DeletePopup from "./DeletePopup";
import ErrorImage from "./ErrorImage";
import ForgotPasswordForm from "./forms/ForgotPasswordForm";
import LoginForm from "./forms/LoginForm";
import PlayerLordIcon from "./forms/PlayerLordIcon";
import RegistrationForm from "./forms/RegistrationForm";
import RememberMe from "./forms/RememberMe";
import ResendOtpForm from "./forms/ResendOtpForm";
import ResetPasswordForm from "./forms/ResetPasswordForm";
import SocialAuthForm from "./forms/SocialAuthForm";
import VerifyAccount from "./forms/VerifyAccount";
import PasswordInputFiled from "./inputs/PasswordInputFiled";
import TextInputFile from "./inputs/TextInputFile";
import Footer from "./layoutsStyle/Footer";
import LoadingUI from "./layoutsStyle/LoadingUI";
import AuthProtectedLayoutProvider from "./navigation/AuthProtectedLayoutProvider";
import HorizontalSidebar from "./navigation/horizontalNavigationbar/HorizontalSidebar";
import LeftSidebar from "./navigation/leftSidebar/LeftSidebar";
import LeftSidebarSmallIconView from "./navigation/leftSidebar/LeftSidebarSmallIconView";
import LeftTwoColumnSidebar from "./navigation/leftSidebar/LeftTwoColumnSidebar";
import Navbar from "./navigation/navbar/Navbar";
import NavbarLanguages from "./navigation/navbar/NavbarLanguages";
import NavbarMyCart from "./navigation/navbar/NavbarMyCart";
import NavbarNotification from "./navigation/navbar/NavbarNotification";
import NavbarSearchSmallDevice from "./navigation/navbar/NavbarSearchSmallDevice";
import NavbarThemeSwitcher from "./navigation/navbar/NavbarThemeSwitcher";
import NavbarWebApps from "./navigation/navbar/NavbarWebApps";
import NavFullScreenToggleButton from "./navigation/navbar/NavFullScreenToggleButton";
import NavLogo from "./navigation/navbar/NavLogo";
import NavProfile from "./navigation/navbar/NavProfile";
import NavSearchBox from "./navigation/navbar/NavSearchBox";
import NavSearchBoxRecentSearches from "./navigation/navbar/NavSearchBoxRecentSearches";
import ToggleButton from "./navigation/navbar/ToggleButton";
import RightSidebar from "./navigation/rightSidebar/RightSidebar";
import TransitionLink from "./navigation/TransitionLink";
// Blog System
import CategoryDefaultdButton from "./pagesComponent/blogs/categories/CategoryDefaultdButton";
import CategoryDeleteButton from "./pagesComponent/blogs/categories/CategoryDeleteButton";
import CategoryFeaturedButton from "./pagesComponent/blogs/categories/CategoryFeaturedButton";
import CategoryStatusButton from "./pagesComponent/blogs/categories/CategoryStatusButton";
import CreateNewCategoryForm from "./pagesComponent/blogs/categories/CreateNewCategoryForm";
import RenderAllCategories from "./pagesComponent/blogs/categories/RenderAllCategories";
import RenderCategoryOptions from "./pagesComponent/blogs/categories/RenderCategoryOptions";
import UpdateCategoryForm from "./pagesComponent/blogs/categories/UpdateCategoryForm";
import AllBlogPostsList from "./pagesComponent/blogs/posts/AllBlogPostsList";
import CreateBlogPostForm from "./pagesComponent/blogs/posts/CreateBlogPostForm";
import EachPostActions from "./pagesComponent/blogs/posts/EachPostActions";
import PostActiveButton from "./pagesComponent/blogs/posts/PostActiveButton";
import PostDeleteButton from "./pagesComponent/blogs/posts/PostDeleteButton";
import PostFeaturedButton from "./pagesComponent/blogs/posts/PostFeaturedButton";
import RowsPerPageSelection from "./pagesComponent/blogs/posts/RowsPerPageSelection";
import UpdatePostForm from "./pagesComponent/blogs/posts/UpdatePostForm";
import LabelText from "./pagesComponent/LabelText";
import PaginationComponent from "./pagesComponent/PaginationComponent";
import SearchInputField from "./pagesComponent/SearchInputField";
// Dashboard Analytics
import Breadcrumb from "./pagesComponent/Breadcrumb";
import AudiencesMetrics from "./pagesComponent/dashboardAnalytics/AudiencesMetrics";
import AudiencesSessionsByCountry from "./pagesComponent/dashboardAnalytics/AudiencesSessionsByCountry";
import CountupText from "./pagesComponent/dashboardAnalytics/CountupText";
import CustomExportButton from "./pagesComponent/dashboardAnalytics/CustomExportButton";
import SessionsByCountries from "./pagesComponent/dashboardAnalytics/SessionsByCountries";
import TopPages from "./pagesComponent/dashboardAnalytics/TopPages";
import TopReferralsPages from "./pagesComponent/dashboardAnalytics/TopReferralsPages";
import UserByDevice from "./pagesComponent/dashboardAnalytics/UserByDevice";
import Widget from "./pagesComponent/dashboardAnalytics/Widget";
// Dashboard CRM
import BalanceOverview from "./pagesComponent/dashboardCRM/BalanceOverview";
import ClosingDeals from "./pagesComponent/dashboardCRM/ClosingDeals";
import DealsStatus from "./pagesComponent/dashboardCRM/DealsStatus";
import DealType from "./pagesComponent/dashboardCRM/DealType";
import MyTasks from "./pagesComponent/dashboardCRM/MyTasks";
import SalesForecast from "./pagesComponent/dashboardCRM/SalesForecast";
import UpcomingActivites from "./pagesComponent/dashboardCRM/UpcomingActivites";
// Dashboard Ecommerce
import AddPrdocutsAndSheet from "./pagesComponent/dashboardEcommerce/AddPrdocutsAndSheet";
import BestSellingProducts from "./pagesComponent/dashboardEcommerce/BestSellingProducts";
import DateRangePicker from "./pagesComponent/dashboardEcommerce/DateRangePicker";
import EcommerceWidgets from "./pagesComponent/dashboardEcommerce/EcommerceWidgets";
import ProgressBar from "./pagesComponent/dashboardEcommerce/ProgressBar";
import RecentOrders from "./pagesComponent/dashboardEcommerce/RecentOrders";
import RecentOrdersOrderId from "./pagesComponent/dashboardEcommerce/RecentOrdersOrderId";
import Revenue from "./pagesComponent/dashboardEcommerce/Revenue";
import SalesByLocations from "./pagesComponent/dashboardEcommerce/SalesByLocations";
import StoreVisits from "./pagesComponent/dashboardEcommerce/StoreVisits";
import TopSellers from "./pagesComponent/dashboardEcommerce/TopSellers";
// Image Console
import AddNewImageButton from "./pagesComponent/imageConsole/AddNewImageButton";
import ImageSearchBox from "./pagesComponent/imageConsole/ImageSearchBox";
import ImageSettingButton from "./pagesComponent/imageConsole/ImageSettingButton";
import ImageDialogContent from "./pagesComponent/imageDialogBox/ImageDialogContent";
import ImageReuseDialog from "./pagesComponent/imageDialogBox/ImageReuseDialog";
// Uppy Uploader
import DownloadFile from "./pagesComponent/uppyUploader/DownloadFile";
import EmptyCard from "./pagesComponent/uppyUploader/EmptyCard";
import FileGallery from "./pagesComponent/uppyUploader/FileGallery";
import FileItemWrapper from "./pagesComponent/uppyUploader/FileItemWrapper";
import FileTypeFilterDropdown from "./pagesComponent/uppyUploader/FileTypeFilterDropdown";
import ImageDetailedPreview from "./pagesComponent/uppyUploader/ImageDetailedPreview";
import SearchByFileName from "./pagesComponent/uppyUploader/SearchByFileName";
import UploadFiles from "./pagesComponent/uppyUploader/UploadFiles";
import UppyUploader from "./pagesComponent/uppyUploader/UppyUploader";

export {
  AddNewImageButton,
  AddPrdocutsAndSheet,
  AllBlogPostsList,
  AudiencesMetrics,
  AudiencesSessionsByCountry,
  AuthProtectedLayoutProvider,
  BalanceOverview,
  BestSellingProducts,
  Breadcrumb,
  CategoryDefaultdButton,
  CategoryDeleteButton,
  CategoryFeaturedButton,
  CategoryStatusButton,
  ClosingDeals,
  CountupText,
  CreateBlogPostForm,
  CreateNewCategoryForm,
  CustomExportButton,
  DateRangePicker,
  DealsStatus,
  DealType,
  DeletePopup,
  DownloadFile,
  EachPostActions,
  EcommerceWidgets,
  EmptyCard,
  ErrorImage,
  FileGallery,
  FileItemWrapper,
  FileTypeFilterDropdown,
  Footer,
  ForgotPasswordForm,
  HorizontalSidebar,
  ImageDetailedPreview,
  ImageDialogContent,
  ImageReuseDialog,
  ImageSearchBox,
  ImageSettingButton,
  LabelText,
  LeftSidebar,
  LeftSidebarSmallIconView,
  LeftTwoColumnSidebar,
  LoadingUI,
  LoginForm,
  MyTasks,
  Navbar,
  NavbarLanguages,
  NavbarMyCart,
  NavbarNotification,
  NavbarSearchSmallDevice,
  NavbarThemeSwitcher,
  NavbarWebApps,
  NavFullScreenToggleButton,
  NavLogo,
  NavProfile,
  NavSearchBox,
  NavSearchBoxRecentSearches,
  PaginationComponent,
  PasswordInputFiled,
  PlayerLordIcon,
  PostActiveButton,
  PostDeleteButton,
  PostFeaturedButton,
  ProgressBar,
  RecentOrders,
  RecentOrdersOrderId,
  RegistrationForm,
  RememberMe,
  RenderAllCategories,
  RenderCategoryOptions,
  ResendOtpForm,
  ResetPasswordForm,
  Revenue,
  RightSidebar,
  RowsPerPageSelection,
  SalesByLocations,
  SalesForecast,
  SearchByFileName,
  SearchInputField,
  SessionsByCountries,
  SocialAuthForm,
  StoreVisits,
  TextInputFile,
  ToggleButton,
  TopPages,
  TopReferralsPages,
  TopSellers,
  TransitionLink,
  UpcomingActivites,
  UpdateCategoryForm,
  UpdatePostForm,
  UploadFiles,
  UppyUploader,
  UserByDevice,
  VerifyAccount,
  Widget,
};
