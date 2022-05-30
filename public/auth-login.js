// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBDCZ7lehJGVY4tAWyPzAXkEiekx9QJkUY",
    authDomain: "chatabolic.firebaseapp.com",
    projectId: "chatabolic",
    storageBucket: "chatabolic.appspot.com",
    messagingSenderId: "307425308969",
    appId: "1:307425308969:web:c46450f53bc49e8e8d8738"
};
// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
var uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        return true;
        },
        uiShown: function() {
        // The widget is rendered.
        // Hide the loader.
        document.getElementById('loader').style.display = 'none';
        }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    //signInSuccessUrl: 'index.html',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        //firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        //firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        //firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>',
    // Privacy policy url.
    privacyPolicyUrl: '<your-privacy-policy-url>'
    };

ui.start('#firebaseui-auth-container', uiConfig);

//this sets an event handler that activates whenever the user's 
//authentication state changes, verified->non-verified or vice versa
firebase.auth().onAuthStateChanged(user => {

    //if user is non-verified, then user===null
    if (user) {
        //initChat(user);
        console.log(user.uid);
        socket.emit('login',user.uid);
    }
    else{
        
    }
    });