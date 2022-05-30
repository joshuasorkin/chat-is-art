 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyBDCZ7lehJGVY4tAWyPzAXkEiekx9QJkUY",
    authDomain: "chatabolic.firebaseapp.com",
    projectId: "chatabolic",
    storageBucket: "chatabolic.appspot.com",
    messagingSenderId: "307425308969",
    appId: "1:307425308969:web:c46450f53bc49e8e8d8738"
};
firebase.initializeApp(firebaseConfig);

const txtEmail=document.getElementById('txtEmail');
const txtPassword=document.getElementById('txtPassword');
const btnLogin=document.getElementById('btnLogin');
const btnSignup=document.getElementById('btnSignup');
const btnLogout=document.getElementById('btnLogout');

btnLogin.addEventListener('click',e=>{
    const email = txtEmail.value
    const pass = txtPassword.value;
    const auth = firebase.auth();
    auth.signInWithEmailAndPassword(email,pass)
    .catch(e=>console.log(e.message));

});

btnSignup.addEventListener('click',e=>{
    const email = txtEmail.value
    const pass = txtPassword.value;
    const auth = firebase.auth();
    auth.createUserWithEmailAndPassword(email,pass)
    .catch(e=>console.log(e.message));
});

firebase.auth().onAuthStateChanged(firebaseUser=>{
    if(firebaseUser){
        console.log(firebaseUser);
        btnLogout.classList.remove('hide');
        firebase.auth().currentUser.getIdToken(true)
            .then(idToken=>{
                var data = {
                    idToken:idToken
                }
                fetch('/redirect',{
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                      },
                      method: "POST",
                      mode: "cors",
                      body: JSON.stringify(data)
                })
                .catch(error=>{
                    console.log(`error with redirect fetch post: ${error}`);
                });
            })
            .catch(error=>{
                console.log(error);
            })
    }
    else{
        console.log('not logged in');
        btnLogout.classList.add('hide');
    }
});

btnLogout.addEventListener('click',e=>{
    firebase.auth().signOut();
});