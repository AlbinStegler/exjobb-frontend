import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';

import './index.css';
import CreateEvent from './views/create-event/createEvent';
import Event from './views/event/event';
import Login from './views/login/login';
import Start from './views/start/start';
import Book from './views/userSeat/userSeat';
import Footer from './components/footer/footer';
import Confirmation from './views/confirmation/confirmation';
import EventView from './components/eventview/eventview';

import reportWebVitals from './reportWebVitals';
import AdminStart from './views/admin-start/adminStart';
import LanInfo from './views/lanInfo/lanInfo';
import LanTerms from './views/lan-terms/lanTerms';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <AuthProvider /> */}
    <Router>
      <main>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/event" element={<Event />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminStart />} />
          <Route path="/book" element={<Book />}></Route>
          <Route path="/confirmation" element={<Confirmation />}></Route>
          <Route path="/events" element={<EventView />} />
          <Route path="/lanInfo/" element={<LanInfo />} />
          <Route path="/lan-terms" element={<LanTerms />} />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
