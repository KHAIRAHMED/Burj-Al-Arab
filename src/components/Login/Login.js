import React,{useContext} from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
firebase.initializeApp(firebaseConfig)
const Login = () => {
  const [isLoggedIn , setLoggedIn] = useContext(userContext)
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
  let loggedInUser = {
    name :'',
    email : ''
  }
  const googleSignIn = ()=>{
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
  .signInWithPopup(googleProvider)
  .then((result) => {
    const {displayName , email} = result.user;
    loggedInUser ={
      name : displayName,
      email: email
    }
    setLoggedIn(loggedInUser)
    tokenUser()
    history.replace(from);
  }).catch((error) => {
    var errorMessage = error.message;

  });
    
  }
  const githubSignIn= ()=>{
    const githubProvider = new firebase.auth.GithubAuthProvider();
    firebase
  .auth()
  .signInWithPopup(githubProvider)
  .then((result) => {
    const {displayName , email} = result.user;
    loggedInUser ={
      name : displayName,
      email: email
    }
    setLoggedIn(loggedInUser)
    tokenUser()
    history.replace(from);
  }).catch((error) => {
    var errorMessage = error.message;
  });
  }
  const facebookLogin = ()=>{
    var fbProvider = new firebase.auth.FacebookAuthProvider();
    firebase
  .auth()
  .signInWithPopup(fbProvider)
  .then((result) => {
    const {displayName , email} = result.user;
    loggedInUser ={
      name : displayName,
      email: email
    }
    setLoggedIn(loggedInUser)
    tokenUser()
    history.replace(from);
  })
  .catch((error) => {
    var errorMessage = error.message;
    console.log(errorMessage);
  })
  };


  // firebase jwt token
  const tokenUser = ()=>{
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
    .then(function(idToken) {
      sessionStorage.setItem("token",idToken)
    })
    .catch(function(error) {
      // Handle error
    });

  }

  return(
    <div>
      <button onClick={googleSignIn}>Google Sign In</button>
      <button onClick={githubSignIn}>Github Sign In</button>
      <button onClick={facebookLogin}>Facebook log In</button>
    </div>
  );
};

export default Login;