import './App.css';
import "bootstrap-css-only";
import { Route, Routes} from 'react-router-dom';

import Registro from '../Pages/Registro';
import Login from '../Pages/Login';
import Dashboard from '../Pages/Dashboard/DashboardPage'
import PrivateRoute from '../Pages/PrivateRoute/PrivateRoute';

function App() {



  return (
    <>
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/signup" element={<Registro />} />
      <Route path="/dashboard" element={
        <PrivateRoute>
        <Dashboard />
        </PrivateRoute>
      }
      />
    </Routes>
    </>
  );
}

export default App;
