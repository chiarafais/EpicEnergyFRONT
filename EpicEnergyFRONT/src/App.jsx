import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Mainpage from "./components/Mainpage";
import RegisterUser from "./components/RegisterUser";
import Customer from "./components/Customer";
import Invoice from "./components/Invoice";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Mainpage />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/customer/:id" element={<Customer />} />
        <Route path="/invoice/:id" element={<Invoice />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
