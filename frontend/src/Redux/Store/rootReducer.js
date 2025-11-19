import { combineReducers } from 'redux';
import authReducer from '../Features/Auth/authReducer';
import userReducer from '../Features/User/userReducer';
import streamReducer from '../Features/Stream/streamReducer';
import textReducer from '../Features/Text/textReducer';
import audioReducer from '../Features/Audio/audioReducer';
import visualReducer from '../Features/Photos/photosReducer';
import videoReducer from '../Features/Video/videoReducer';
import liveVideoReducer from '../Features/LiveVideo/liveVideoReducer';
import chatReducer from '../Features/Messanger/chatReducer';
import searchReducer from '../Features/Search/searchReducer';
import shopReducer from '../Features/Marketplace/shopReducer';
import productReducer from '../Features/Marketplace/productReducer';
import cartReducer from '../Features/Marketplace/cartReducer';
import orderReducer from '../Features/Marketplace/orderReducer';
import scheduleReducer from '../Features/Scheduler/scheduleReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  stream: streamReducer,
  text:textReducer,
  audio:audioReducer,
  visual:visualReducer,
  video:videoReducer,
  liveVideo:liveVideoReducer,
  messenger:chatReducer,
  search:searchReducer,
  marketplaceShop:shopReducer,
  marketplaceProduct:productReducer,
  marketplaceCart:cartReducer,
  marketplaceOrder:orderReducer,
  schedule:scheduleReducer
});

export default rootReducer;

