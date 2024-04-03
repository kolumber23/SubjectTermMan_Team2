import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import {Provider} from "./Provider"
import App from './App';
import SubjectR from "./routes/SubjectR";
import StudentR from './routes/StudentR';
import HomeR from './routes/HomeR';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="" element={<HomeR/>} />
            <Route path="/student" element={<StudentR/>} />
            <Route path="/subject" element={<SubjectR/>} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();