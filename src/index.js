import './index.css'
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

import {
  Route, Routes, BrowserRouter
} from "react-router-dom";

//pages
import Home from './pages/home/home';

function AppRoutes() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </React.StrictMode>
);

