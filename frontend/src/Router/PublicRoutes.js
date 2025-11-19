import SignIn from "../Pages/SignIn";
import SignUp from "../Pages/SignUp";
import DiscoverPage from "../Pages/DIscoverPage";
import NotificationsPage from "../Pages/Notifications";



const publicRoutes = [
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/discover",
    element: <DiscoverPage />,
  },
  {
    path: "/notifications",
    element: <NotificationsPage />,
  },

];

export default publicRoutes;
