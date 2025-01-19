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
import Footer from "./layouts-style/Footer";
import LoadingUI from "./layouts-style/LoadingUI";
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
import CategoryDefaultdButton from "./pages-component/blogs/categories/CategoryDefaultdButton";
import CategoryDeleteButton from "./pages-component/blogs/categories/CategoryDeleteButton";
import CategoryFeaturedButton from "./pages-component/blogs/categories/CategoryFeaturedButton";
import CategoryStatusButton from "./pages-component/blogs/categories/CategoryStatusButton";
import CreateNewCategoryForm from "./pages-component/blogs/categories/CreateNewCategoryForm";
import RenderAllCategories from "./pages-component/blogs/categories/RenderAllCategories";
import RenderCategoryOptions from "./pages-component/blogs/categories/RenderCategoryOptions";
import UpdateCategoryForm from "./pages-component/blogs/categories/UpdateCategoryForm";
import AllBlogPostsList from "./pages-component/blogs/posts/AllBlogPostsList";
import CategoriesFilter from "./pages-component/blogs/posts/CategoriesFilter";
import CreateBlogPostForm from "./pages-component/blogs/posts/CreateBlogPostForm";
import EachPostActions from "./pages-component/blogs/posts/EachPostActions";
import PostActiveButton from "./pages-component/blogs/posts/PostActiveButton";
import PostDeleteButton from "./pages-component/blogs/posts/PostDeleteButton";
import PostFeaturedButton from "./pages-component/blogs/posts/PostFeaturedButton";
import PostFilterDropdown from "./pages-component/blogs/posts/PostFilterDropdown";
import RowsPerPageSelection from "./pages-component/blogs/posts/RowsPerPageSelection";
import SVGBannerImage from "./pages-component/blogs/posts/SVGBannerImage";
import UpdatePostForm from "./pages-component/blogs/posts/UpdatePostForm";
import LabelText from "./pages-component/LabelText";
import PaginationComponent from "./pages-component/PaginationComponent";
import SearchInputField from "./pages-component/SearchInputField";
// Dashboard Analytics
import Breadcrumb from "./pages-component/Breadcrumb";
import AudiencesMetrics from "./pages-component/dashboard-analytics/AudiencesMetrics";
import AudiencesSessionsByCountry from "./pages-component/dashboard-analytics/AudiencesSessionsByCountry";
import CountupText from "./pages-component/dashboard-analytics/CountupText";
import CustomExportButton from "./pages-component/dashboard-analytics/CustomExportButton";
import SessionsByCountries from "./pages-component/dashboard-analytics/SessionsByCountries";
import TopPages from "./pages-component/dashboard-analytics/TopPages";
import TopReferralsPages from "./pages-component/dashboard-analytics/TopReferralsPages";
import UserByDevice from "./pages-component/dashboard-analytics/UserByDevice";
import Widget from "./pages-component/dashboard-analytics/Widget";
// Dashboard CRM
import BalanceOverview from "./pages-component/dashboard-crm/BalanceOverview";
import ClosingDeals from "./pages-component/dashboard-crm/ClosingDeals";
import DealsStatus from "./pages-component/dashboard-crm/DealsStatus";
import DealType from "./pages-component/dashboard-crm/DealType";
import MyTasks from "./pages-component/dashboard-crm/MyTasks";
import SalesForecast from "./pages-component/dashboard-crm/SalesForecast";
import UpcomingActivites from "./pages-component/dashboard-crm/UpcomingActivites";
// Dashboard Ecommerce
import AddPrdocutsAndSheet from "./pages-component/dashboard-ecommerce/AddPrdocutsAndSheet";
import BestSellingProducts from "./pages-component/dashboard-ecommerce/BestSellingProducts";
import DateRangePicker from "./pages-component/dashboard-ecommerce/DateRangePicker";
import EcommerceWidgets from "./pages-component/dashboard-ecommerce/EcommerceWidgets";
import ProgressBar from "./pages-component/dashboard-ecommerce/ProgressBar";
import RecentOrders from "./pages-component/dashboard-ecommerce/RecentOrders";
import RecentOrdersOrderId from "./pages-component/dashboard-ecommerce/RecentOrdersOrderId";
import Revenue from "./pages-component/dashboard-ecommerce/Revenue";
import SalesByLocations from "./pages-component/dashboard-ecommerce/SalesByLocations";
import StoreVisits from "./pages-component/dashboard-ecommerce/StoreVisits";
import TopSellers from "./pages-component/dashboard-ecommerce/TopSellers";
// Uppy Uploader
import DownloadFile from "./pages-component/uppy-uploader/DownloadFile";
import EmptyCard from "./pages-component/uppy-uploader/EmptyCard";
import FileGallery from "./pages-component/uppy-uploader/FileGallery";
import FileItemWrapper from "./pages-component/uppy-uploader/FileItemWrapper";
import FileTypeFilterDropdown from "./pages-component/uppy-uploader/FileTypeFilterDropdown";
import ImageDetailedPreview from "./pages-component/uppy-uploader/ImageDetailedPreview";
import ImagePreview from "./pages-component/uppy-uploader/ImagePreview";
import OverlayButtons from "./pages-component/uppy-uploader/OverlayButtons";
import PillTooltip from "./pages-component/uppy-uploader/PillTooltip";
import SearchByFileName from "./pages-component/uppy-uploader/SearchByFileName";
import UploadFiles from "./pages-component/uppy-uploader/UploadFiles";
import UppyUploader from "./pages-component/uppy-uploader/UppyUploader";
import VideoPreview from "./pages-component/uppy-uploader/VideoPreview";
// Reuse File
import FileDialogContent from "./pages-component/file-reuse-component/FileDialogContent";
import FileDialogInner from "./pages-component/file-reuse-component/FileDialogInner";
import FileReuseDialog from "./pages-component/file-reuse-component/FileReuseDialog";

export {
  AddPrdocutsAndSheet,
  AllBlogPostsList,
  AudiencesMetrics,
  AudiencesSessionsByCountry,
  AuthProtectedLayoutProvider,
  BalanceOverview,
  BestSellingProducts,
  Breadcrumb,
  CategoriesFilter,
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
  FileDialogContent,
  FileDialogInner,
  FileGallery,
  FileItemWrapper,
  FileReuseDialog,
  FileTypeFilterDropdown,
  Footer,
  ForgotPasswordForm,
  HorizontalSidebar,
  ImageDetailedPreview,
  ImagePreview,
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
  OverlayButtons,
  PaginationComponent,
  PasswordInputFiled,
  PillTooltip,
  PlayerLordIcon,
  PostActiveButton,
  PostDeleteButton,
  PostFeaturedButton,
  PostFilterDropdown,
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
  SVGBannerImage,
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
  VideoPreview,
  Widget,
};
