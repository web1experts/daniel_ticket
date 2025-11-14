import { useEffect , useMemo , useState} from "react";
import { ToastContainer } from "react-toastify";
import AppRoutes from "./App/AppRoutes";
import "./App.css";



function App() {
  return (
    <div className="App">
      <AppRoutes />
      <ToastContainer />
    </div>
  );
}

export default App;

