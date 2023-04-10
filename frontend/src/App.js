import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";
import AddContact from "./Components/AddContact/AddContact";
import Navigation from "./Components/Navigation/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditContact from "./Components/EditContact/EditContact";
import Authentification from "./Components/Authentfication/Authentification";
import PrivateRouter from "./Components/PrivateRouter/PrivateRouter";

function App() {
  return (
    <>
      <ToastContainer />
      <Navigation />
      <Routes>
        <Route path="/" element={<Authentification />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRouter>
              <Dashboard />
            </PrivateRouter>
          }
        />
        <Route
          path="/Addcontact"
          element={
            <PrivateRouter>
              <AddContact />
            </PrivateRouter>
          }
        />
        <Route
          path="/Editcontact/:id"
          element={
            <PrivateRouter>
              <EditContact />
            </PrivateRouter>
          }
        />
      </Routes>
    </>
  );
}

export default App;
