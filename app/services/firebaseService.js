
const firebase = require('firebase/app');
const firebaseAuth = require('firebase/auth'); // This is a necessary import

const config = (process.env.NODE_ENV !== 'production') ? {
  apiKey: "AIzaSyC9IG_3k-6pISqS1HO82GPVqm4bOo_aVb0",
  authDomain: "yfn-aerospace-staging.firebaseapp.com",
  databaseURL: "https://yfn-aerospace-staging.firebaseio.com",
  storageBucket: "yfn-aerospace-staging.appspot.com",
} : {
  apiKey: "AIzaSyDAzrKDM0Mjw20BiQKSyL3G09cUUTDXTjE",
  authDomain: "yfn-aerospace.firebaseapp.com",
  databaseURL: "https://yfn-aerospace.firebaseio.com",
  storageBucket: "yfn-aerospace.appspot.com"
};

/**
 * FirebaseService
 */
class FirebaseService  {
  constructor() {
    if (!FirebaseService.instance) {
      this.app = firebase.initializeApp(config);
      FirebaseService.instance = this;
    }
    return FirebaseService.instance;
  }

  /**
   *
   * @param email
   * @param password
   * @param callback(@param message, @param isSuccess, @param promise)
   */
  registerUser = (email, password, callback) => {
    let promise = firebase.auth().createUserWithEmailAndPassword(email, password);
    promise.then(user => {
      callback(`Account created with email ${user.email}. You are now logged in.`, true, promise)
    }, (error) => {
      callback(error.message, false, promise);
    });
  };

  /**
   *
   * @param email
   * @param password
   * @param callback(@param message, @param isSuccess, @param promise)
   */
  loginUser = (email, password, callback) => {
    let returnableMessage = '';
    let promise = firebase.auth().signInWithEmailAndPassword(email, password);
    promise.then(user => {
      callback(`You are now logged in as ${user.email}`, true, promise)
    }, error => {
      let errorCode = error.code;
      let errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        returnableMessage = 'Wrong password.';
      } else {
        returnableMessage = errorMessage;
      }
      callback(returnableMessage, false, promise);
    });
  };

  /**
   *
   * @param name
   * @param photoURL
   * @param callback(@param response, @param isSuccessful, @param promise)
   */
  updateUserProfile = (name, photoURL='', callback) => {
    let response = undefined;
    let promise = this.getCurrentUser().updateProfile({
      displayName: name,
      photoURL: photoURL
    }).then(() => {
      response = "Success!";
      callback(response, true, promise);
    }, error => {
      response = `Code: ${err.code} \r\n Message: ${err.message}`;
      callback(response, false, promise);
    });
  };

  /**
   *
   * @returns {firebase.User|null}
   */
  getCurrentUser = () => {
    return firebase.auth().currentUser;
  };

  /**
   *
   * @param authCallback
   * @param authRemovedCallback
   */
  setAuthObserver = (authCallback, authRemovedCallback) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        authCallback(user);
      } else {
        authRemovedCallback();
      }
    })
  };

  /**
   *
   * @returns {firebase.Promise<any>|!firebase.Promise.<void>}
   */
  signOut = () => {
    return firebase.auth().signOut();
  };

  getDatabase = () => {
    return firebase.database(this.app);
  };



}

const instance = new FirebaseService();
Object.freeze(instance);
export default instance;