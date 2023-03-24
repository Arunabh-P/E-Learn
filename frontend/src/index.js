import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SnackbarProvider } from 'notistack';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import store from './store';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <SnackbarProvider maxSnack={3}>
          <App />
        </SnackbarProvider>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);
