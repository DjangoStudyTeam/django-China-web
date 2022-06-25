import './index.scss';

import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import { UserInfoProvider } from './components/UserInfoProvider';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faBell);

ReactDOM.render(
  <React.StrictMode>
    <UserInfoProvider>
      <App />
    </UserInfoProvider>
  </React.StrictMode>,

  document.getElementById('root'),
);
