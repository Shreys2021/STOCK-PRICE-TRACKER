
import StocksList from "./components/Stocks/StocksList";
import Navbar from "./components/Layout/Navbar";
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SubscribeStock from "./components/Stocks/SubscribedStocks";
import LoginButton from "./components/user/Login";
import LogoutButton from "./components/user/Logout";



function App() {


  return (
    <Auth0Provider
      domain="auth-lief.us.auth0.com"
      clientId="OVvueVpPA5BPKnWluIowwN8sdUbapFwt"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<StocksList />} />
          <Route path="/subscribed-stocks" element={<SubscribeStock />} />
          <Route path="/login" element={<LoginButton />} />
          <Route path="/logout" element={<LogoutButton />} />
        </Routes>
      </Router>
    </Auth0Provider>
  );
}

export default App;
