//NOTE Language Images ---
import flagSpain from "../images/flags/spain.svg";
import flagGermany from "../images/flags/germany.svg";
import flagItaly from "../images/flags/italy.svg";
import flagRussia from "../images/flags/russia.svg";
import flagUs from "../images/flags/us.svg";
import flagChina from "../images/flags/china.svg";
import flagFrench from "../images/flags/french.svg";
import flagArabic from "../images/flags/ar.svg";

//NOTE WebApp Images ---
import github from "../images/brands/github.png";
import bitbucket from "../images/brands/bitbucket.png";
import dribbble from "../images/brands/dribbble.png";
import dropbox from "../images/brands/dropbox.png";
import mail_chimp from "../images/brands/mail_chimp.png";
import slack from "../images/brands/slack.png";

//NOTE MyCart Images ----
import productImage1 from "../images/products/img-1.png";
import productImage2 from "../images/products/img-2.png";
import productImage3 from "../images/products/img-3.png";
import productImage5 from "../images/products/img-5.png";
import productImage6 from "../images/products/img-6.png";

//NOTE Notifications
import { BiBadgeCheck, BiMessageSquareDots } from "react-icons/bi";
import avatar1 from "../images/users/avatar-2.jpg";
import avatar2 from "../images/users/avatar-8.jpg";
import avatar3 from "../images/users/avatar-3.jpg";
import avatar4 from "../images/users/avatar-6.jpg";

//NOTE Languages Data ****
export const languagesDetails = {
  spain: {
    label: "Española",
    flag: flagSpain,
  },
  germany: {
    label: "Deutsche",
    flag: flagGermany,
  },
  italy: {
    label: "Italiana",
    flag: flagItaly,
  },
  russia: {
    label: "русский",
    flag: flagRussia,
  },
  english: {
    label: "English",
    flag: flagUs,
  },
  china: {
    label: "中国人",
    flag: flagChina,
  },
  french: {
    label: "français",
    flag: flagFrench,
  },
  arabic: {
    label: "Arabic",
    flag: flagArabic,
  },
};

//NOTE WebApp Data ****
export const webAppsData = [
  {
    id: "github_webapp",
    appName: "Github",
    appImage: github,
  },
  {
    id: "bitbucket_webapp",
    appName: "Bitbucket",
    appImage: bitbucket,
  },
  {
    id: "dribble_webapp",
    appName: "Dribble",
    appImage: dribbble,
  },
  {
    id: "dropbox_webapp",
    appName: "Dropbox",
    appImage: dropbox,
  },
  {
    id: "mailchimp_webapp",
    appName: "Mail Chimp",
    appImage: mail_chimp,
  },
  {
    id: "slack_webapp",
    appName: "Slack",
    appImage: slack,
  },
];

//NOTE MyCart Data ****
export const myCartData = [
  {
    id: "cart_1",
    productImage: productImage1,
    productName: "Branded T-Shirts",
    productQuantity: 10,
    productPrice: 32,
  },
  {
    id: "cart_2",
    productImage: productImage2,
    productName: "Bentwood Chair",
    productQuantity: 5,
    productPrice: 18,
  },
  {
    id: "cart_3",
    productImage: productImage3,
    productName: "Borosil Paper Cup",
    productQuantity: 3,
    productPrice: 250,
  },
  {
    id: "cart_4",
    productImage: productImage5,
    productName: "Gray Styled T-Shirt",
    productQuantity: 1,
    productPrice: 1250,
  },
  {
    id: "cart_5",
    productImage: productImage6,
    productName: "Stillbird Helmet",
    productQuantity: 2,
    productPrice: 495,
  },
];

//NOTE Nav Notifications Data ****
export const notificationsData = [
  {
    id: "all-notification",
    label: "All",
    content: [
      {
        id: "noti-1",
        type: "general",
        notificationText: `Your Elite author Graphic Optimization reward is ready!`,
        time: "JUST 30 SEC AGO",
        icon: <BiBadgeCheck size={15} color="#41A3DC" />,
        iconBgColor: "#DFF0FA",
      },
      {
        id: "noti-2",
        type: "user",
        username: "Angela Bernier",
        notificationText:
          "Answered to your comment on the cash flow forecast's graph 🔔.",
        time: "48 MIN AGO",
        userImage: avatar1,
      },
      {
        id: "noti-3",
        type: "general",
        notificationText:
          "You have received 20 new messages in the conversation",
        time: "2 HRS AGO",
        icon: <BiMessageSquareDots size={15} color="#F06548" />,
        iconBgColor: "#FDE8E4",
      },
      {
        id: "noti-4",
        type: "user",
        username: "Maureen Gibson",
        notificationText: "We talked about a project on linkedin.",
        time: "4 HRS AGO",
        userImage: avatar2,
      },
    ],
  },
  {
    id: "all-message-notifications",
    label: "Messages",
    content: [
      {
        id: "msg-noti-1",
        type: "user",
        username: "James Lemire",
        notificationText: "We talked about a project on linkedin.",
        time: "30 MIN AGO",
        userImage: avatar3,
      },
      {
        id: "msg-noti-2",
        type: "user",
        username: "Angela Bernier",
        notificationText:
          "Answered to your comment on the cash flow forecast's graph 🔔.",
        time: "2 HRS AGO",
        userImage: avatar1,
      },
      {
        id: "msg-noti-3",
        type: "user",
        username: "Kenneth Brown",
        notificationText: "Mentionned you in his comment on 📃 invoice #12501.",
        time: "10 HRS AGO",
        userImage: avatar4,
      },
      {
        id: "msg-noti-4",
        type: "user",
        username: "Maureen Gibson",
        notificationText: "We talked about a project on linkedin.",
        time: "3 DAYS AGO",
        userImage: avatar2,
      },
    ],
  },
  {
    id: "all-alert-notifications",
    label: "Alerts",
    content: [],
  },
];
