
var firebase = require('firebase/app');

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

class FirebaseService  {
  constructor() {
    if (!FirebaseService.instance) {
      firebase.initializeApp(config);
      FirebaseService.instance = this;
    }
    return FirebaseService.instance;
  }

  registerUser = (email, password) => {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(
      (error) => {
        console.log(error.code);
        console.log(error.message);
      });
  };

  loginUser = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email,password).catch(
      (error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
  };

  updateUserProfile = (name, photoURL='') => {
    let response = undefined;
    this.getCurrentUser().updateProfile({
      displayName: name,
      photoURL: photoURL
    }).then(() => {
      response = "Success!"
    }, (error) => {
      response = `Code: ${err.code} \r\n Message: ${err.message}`;
    });
    return response;
  };

  getCurrentUser = () => {
    return firebase.auth().currentUser;
  }
}

const instance = new FirebaseService();
Object.freeze(instance);
export default instance;