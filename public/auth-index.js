 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyBDCZ7lehJGVY4tAWyPzAXkEiekx9QJkUY",
    authDomain: "chatabolic.firebaseapp.com",
    projectId: "chatabolic",
    storageBucket: "chatabolic.appspot.com",
    messagingSenderId: "307425308969",
    appId: "1:307425308969:web:c46450f53bc49e8e8d8738"
};
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

//this sets an event handler that activates whenever the user's 
//authentication state changes, verified->non-verified or vice versa
firebase.auth().onAuthStateChanged(user => {

    //if user is non-verified, then user===null
    if (user) {
        //initChat(user);
        console.log(user.uid);
        
    }
    else{
        
    }
    });