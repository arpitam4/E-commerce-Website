import React, {useContext} from 'react';
import {USerContext} from './app';

function WithUser(IncomingComponent){
  function OutgoingComponent(props){
    const {user , setUser} = useContext(UserContext);
    return <IncomingComponent {...props} user= {user} setUser={setUser} />
  }

  return OutgoingComponent;
}

export deafult WithUser;