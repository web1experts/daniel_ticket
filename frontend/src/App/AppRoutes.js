
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import SignIn from "../Pages/SignIn";
import MarketResearch from "../Pages/StepsForms/MarketResearch";
import NicheSelection from "../Pages/StepsForms/NicheSelection";
import ContentPlanning from "../Pages/StepsForms/ContentPlanning";
import DesignSetup from "../Pages/StepsForms/DesignSetup";
import ProductGeneration from "../Pages/StepsForms/ProductGeneration";
import VariantsBundles from "../Pages/StepsForms/VariantsBundles";
import LaunchOptimze from "../Pages/StepsForms/LaunchOptimze";


// import publicRoutes from "../routes/PublicRoutes";
// import privateRoutes from "../routes/PrivateRoutes";
// import DiscoverPage from "../Pages/DIscoverPage";
// import StreamPage from "../Pages/Stream";
// import ProfilePage from "../Pages/Profile";
// import RealmSingle from "../Pages/Realm";
// import TextSinglePost from "../Pages/Text";
// import AudioSinglePage from "../Pages/Audio";
// import NotificationsPage from "../Pages/Notifications";
// import PhotosSinglePost from "../Pages/Photos";
// import VideosSinglePost from "../Pages/Video";
// import Broadcaster from "../Components/publisher";
// import Viewer from "../Components/viewer";
// import MarketplacePage from "../Pages/MarkerPlace";
// import CreateShop from "../Pages/MarkerPlace/createShop";
// import ShopPage from "../Pages/MarkerPlace/singleShop";
// import ProductSinglePage from "../Pages/MarkerPlace/shopSinglePage";
// import AddItemPage from "../Pages/MarkerPlace/addItemPage";
// import CartPage from "../Pages/MarkerPlace/Cart";



// Utility function to check login status


const isLoggedIn = () => !!localStorage.getItem("accessToken");

const AppRoutes = () => {
  // const location = useLocation();

  const PublicRoute = ({ element }) => {
    return isLoggedIn() ? <Navigate to="/stream" replace /> : element;
  };

  const PrivateRoute = ({ element }) => {
    return isLoggedIn() ? element : <Navigate to="/discover" replace />;
  };

  const CommonRoute = ({ element }) => {
    return element; // accessible by both logged in and logged out
  };

  return (
    <Routes>
      {/* Default route based on login */}
      <Route path="/" element={<Navigate to={isLoggedIn() ? "/stream" : "/discover"} replace />}
      />
      <Route path="/discover" element={<CommonRoute element={<SignIn />} />} />
      {/* <Route path="/messenger" element={<CommonRoute element={<MessengerPage />} />} /> */}
      <Route path="/market-research" element={<CommonRoute element={<MarketResearch />} />} />
      <Route path="/niche-selection" element={<CommonRoute element={<NicheSelection />} />} />
      <Route path="/content-planning" element={<CommonRoute element={<ContentPlanning />} />} />
      <Route path="/design-setup" element={<CommonRoute element={<DesignSetup />} />} />
      <Route path="/product-generation" element={<CommonRoute element={<ProductGeneration />} />} />
      <Route path="/variants-bundles" element={<CommonRoute element={<VariantsBundles />} />} />
      <Route path="/launch-optimze" element={<CommonRoute element={<LaunchOptimze />} />} />

      <Route path="/audio/:slug" element={<CommonRoute element={<SignIn />} />} />
      <Route path="/text/:slug" element={<CommonRoute element={<SignIn />} />} />
      <Route path="/visual/:slug" element={<CommonRoute element={<SignIn />} />} />
       <Route path="/video/:slug" element={<CommonRoute element={<SignIn/>} />} />
      <Route path="/realm/:type" element={<CommonRoute element={<SignIn />} />} />
      <Route path="/profile/:userName" element={<CommonRoute element={<SignIn/>} />} />
      <Route path="/broadcast/:slug" element={<CommonRoute element={<SignIn/>} />} />
      <Route path="/viewer" element={<CommonRoute element={<SignIn/>} />} />
      <Route path="/marketplace" element={<CommonRoute element={<SignIn />} />} />
      <Route path="/shop/:slug" element={<CommonRoute element={<SignIn/>} />} />
      <Route path="/product/:slug" element={<CommonRoute element={<SignIn/>} />} />
      {/* Stream is a private route */}
      <Route path="/stream" element={<PrivateRoute element={<SignIn />} />} />


      {/* Public routes */}

      {/* {publicRoutes.map(({ path, element }, index) => (
        <Route
          key={index}
          path={path}
          element={<PublicRoute element={element} />}
        />
      ))} */}

      {/* Private routes */}

      {/* {privateRoutes.map(({ path, element }, index) => (
        <Route
          key={index}
          path={path}
          element={<PrivateRoute element={element} />}
        />
      ))} */}

      {/* Catch-all fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;

