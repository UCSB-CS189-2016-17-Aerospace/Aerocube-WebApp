'use strict';

import Firebase from 'firebase/app';
import React from 'react';

const config = {
  apiKey: "AIzaSyDAzrKDM0Mjw20BiQKSyL3G09cUUTDXTjE",
  authDomain: "yfn-aerospace.firebaseapp.com",
  databaseURL: "https://yfn-aerospace.firebaseio.com",
  storageBucket: "yfn-aerospace.appspot.com",
  messagingSenderId: "542713990274"
};

class FirebaseService extends React.Component {
  constructor(props) {
    super(props);
    if (!FirebaseService.instance) {
      this._firebase = Firebase.initializeApp(config);
      FirebaseService.instance = this;
    }
    return FirebaseService.instance;
  }
}

const instance = new FirebaseService();
Object.freeze(instance);
export default instance;