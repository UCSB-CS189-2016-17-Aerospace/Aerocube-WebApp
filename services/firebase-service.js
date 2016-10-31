'use strict';

import Firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDAzrKDM0Mjw20BiQKSyL3G09cUUTDXTjE",
  authDomain: "yfn-aerospace.firebaseapp.com",
  databaseURL: "https://yfn-aerospace.firebaseio.com",
  storageBucket: "yfn-aerospace.appspot.com",
  messagingSenderId: "542713990274"
};

class FirebaseService extends React.component {
  private _firebase: Firebase.app.App | null;
  constructor(firebaseConfig) {
    this._firebase = Firebase.initializeApp(firebaseConfig);
  }
}


export default new FirebaseService(config)