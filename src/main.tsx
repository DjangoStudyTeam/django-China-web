import './index.scss';

import { faBell, faCircleCheck } from '@fortawesome/free-regular-svg-icons';

import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import { UserInfoProvider } from './components/UserInfoProvider';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faBell, faCircleCheck);

ReactDOM.render(
  <React.StrictMode>
    <UserInfoProvider>
      <App />
    </UserInfoProvider>
  </React.StrictMode>,

  document.getElementById('root'),
);
