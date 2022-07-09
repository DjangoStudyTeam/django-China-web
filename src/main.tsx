import './index.scss';

import { faBell, faCircleCheck, faCircleXmark } from '@fortawesome/free-regular-svg-icons';

import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import { ToastsProvider } from './components/ToastsProvider';
import { UserInfoProvider } from './components/UserInfoProvider';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faBell, faCircleCheck, faCircleXmark);

ReactDOM.render(
  <React.StrictMode>
    <UserInfoProvider>
      <ToastsProvider>
        <App />
      </ToastsProvider>
    </UserInfoProvider>
  </React.StrictMode>,

  document.getElementById('root'),
);
