import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './Components/Dashboard/Dashboard';
import AddContact from './Components/AddContact/AddContact';
import Navigation from './Components/Navigation/Navigation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditContact from './Components/EditContact/EditContact';


function App() {
  return (
    <>   
    <ToastContainer />
    <Navigation/>
     <Routes>
      <Route path='/' element={<Dashboard/>}/>
      <Route path='/Addcontact' element={<AddContact/>}/>
      <Route path='/Editcontact/:id' element={<EditContact/>}/>

    </Routes>
    </>

  );
}

export default App;
