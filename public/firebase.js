function login() {
    //var provider = new firebase.auth.TwitterAuthProvider();
    firebase.auth().signInWithEmailAndPassword(provider).catch(function(error) {
      console.log("Error authenticating user:", error);
    });
  }

//can also create user with
//firebase.auth().createUserWithEmailAndPassword(email,pass)


//this sets an event handler that activates whenever the user's 
//authentication state changes, verified->non-verified or vice versa
firebase.auth().onAuthStateChanged(user => {

//if user is non-verified, then user===null
if (user) {
    //initChat(user);
    console.log(user.uid);
}
});