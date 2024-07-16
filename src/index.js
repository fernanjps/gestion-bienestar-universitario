import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { StudentProvider } from './context/StudentContext';
import { ActivityProvider } from './context/ActivityContext';
import { AidProvider } from './context/AidContext';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <StudentProvider>
          <ActivityProvider>
            <AidProvider>
              <App />
            </AidProvider>
          </ActivityProvider>
        </StudentProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
