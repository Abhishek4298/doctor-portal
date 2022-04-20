import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './context/AuthProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './Restaurant_Mng/store';
// import store from './Redux/store';
import { Provider } from "react-redux";

store.subscribe(() => console.log(store.getState()));

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/*" element={
            <Provider store={store}>
              <App />
            </Provider>
          } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
