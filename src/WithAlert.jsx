import React, { useContext } from 'react';
import { AlertContext } from './App';

function WithAlert(IncomingComponent) {
  return function OutgoingComponent(props) {
    const { alert, setAlert } = useContext(AlertContext);
    return <IncomingComponent {...props} alert={alert} setAlert={setAlert} />;
  };
}

export default WithAlert;
