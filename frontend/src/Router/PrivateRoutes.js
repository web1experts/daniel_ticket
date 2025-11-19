// src/routes/privateRoutes.js

import StreamPage from "../Pages/Stream";
import AccountPage from "../Pages/AccountSettings/AccountSettingPage";
import CreatePostPage from "../Pages/CreatPosts/CreatePostPage";
import DiscoverPage from "../Pages/DIscoverPage";
import NotificationsPage from "../Pages/Notifications";
import { MessengerPage } from "../Pages/Messenger";
import GlobalSearch from "../Pages/GlobalSearch";
import MyShop from "../Pages/MarkerPlace/myShop";
import Checkout from "../Pages/MarkerPlace/checkoutPage";
import ShopOrders from "../Pages/MarkerPlace/ordersPage";
import { element } from "prop-types";
import AddEvent from "../Components/MeetingScheduler";
import EditTextePost from "../Pages/Text/editTextPost";
import EditPhotosPost from "../Pages/Photos/editPhotos";
import EditVideoPost from "../Pages/Video/editVideoPost";
import EditAudioPost from "../Pages/Audio/editAudio";
import EditLivePost from "../Pages/LiveVideo/editLiveVideo";
import EditShops from "../Pages/MarkerPlace/EditShops";
// import BookingCalendar from "../Components/MeetingScheduler/BookingModel";
import BookingCalendar from "../Components/MeetingScheduler/BookingScheduler";

import VideoChat from "../Pages/VideoChatPage";
import CartPage from "../Pages/MarkerPlace/Cart";

import AddItemPage from "../Pages/MarkerPlace/addItemPage";
import CreateShop from "../Pages/MarkerPlace/createShop";

import ShopPurchases from "../Pages/MarkerPlace/purchasesPage";
import BookMeetingsList from "../Pages/Meetings";



const privateRoutes = [
  {
    path: "/stream",
    element: <StreamPage />,
  },
  {
    path: "/discover",
    element: <DiscoverPage />,
  },
  {
    path: "/account-setting",
    element: <AccountPage />,
  },
  {
    path: "/create",
    element: <CreatePostPage />,
  },
  {
    path: "/notifications",
    element: <NotificationsPage />,
  },
  {
    path: "/messenger",
    element: <MessengerPage />,
  },
  {
    path: "/search",
    element: <GlobalSearch/>,
  },
  {
    path: "/my-shop",
    element: <MyShop/>,
  },
  {
    path: "/checkout",
    element: <Checkout/>,
  },
  {
    path:"/orders",
    element:<ShopOrders/>
  },
  {
    path:"/purchases",
    element:<ShopOrders/>
  },
  {
    path:"/schedule",
    element:<AddEvent/>
  },
  {
    path:"/booking/:id",
    element:<BookingCalendar/>
  },
  {
    path:"/edit-text/:slug",
    element:<EditTextePost/>
  },
  {
    path:"/edit-visual/:slug",
    element:<EditPhotosPost/>
  },
  {
    path:"/edit-video/:slug",
    element:<EditVideoPost/>
  },
  {
    path:"/edit-audio/:slug",
    element:<EditAudioPost/>
  },
  {
    path:"/edit-live-video/:slug",
    element:<EditLivePost/>
  },
  {
    path:"/edit-shop/:slug",
    element:<EditShops/>
  },
  {
    path:"/meet",
    element:<VideoChat/>
  },
  {
    path:"/cart",
    element:<CartPage/>
  },
  {
    path:"/add-item",
    element:<AddItemPage/>
  },
  {
    path:"/create-shop",
    element:<CreateShop/>
  },
  {
    path:"/my-meetings",
    element:<BookMeetingsList/>
  }
  
];

export default privateRoutes;






