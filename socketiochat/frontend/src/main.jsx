import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Lobby } from './pages/Lobby';
import { Room } from './pages/Room';
import ReactDOM from 'react-dom/client'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>}>
          <Route index element={<Lobby/>}/>
          <Route path="/room/:room" element={<Room/>}/>
          <Route path="*" element={<div>There's nothing here.</div>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
