import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux'
import { CookiesProvider } from 'react-cookie';
import {NotificationContainer} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import './css/topMenu.scss';
import './css/modals.scss';
import './css/leftPanel.scss';
import './css/changeLayout.scss';
import TopMenu from './components/TopMenu';

const App = ({ pcmStore }) => (
  <CookiesProvider>
    <Provider store={pcmStore}>
      <div>
        <TopMenu />
        <div className="notification_container">
          <NotificationContainer />
        </div>
      </div>
    </Provider>
  </CookiesProvider>
)

App.propTypes = {
  pcmStore: PropTypes.object.isRequired
}

export default App;
