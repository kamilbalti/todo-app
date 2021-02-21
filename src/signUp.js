import React, { useState } from "react";
import { FirebaseAuth } from "react-firebaseui";
import { useDispatch, useSelector } from "react-redux";
import App from "./App";
import firebase from "./firebase";
import SignIn from "./signIn";
import "./signIn.css";
import { setUser, setUser2 } from "./store/action";

const SignUp = () => {
  const { user2 } = useSelector((e) => e?.reducer1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const dispatch = useDispatch()

  const logUp = () => {
    firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        dispatch(setUser("user2"))
        // console.log("res", res);
      })
      .catch((err) => {
        dispatch(setUser("user2"))
        dispatch(setUser2("user2"))
        setError(err);
        // console.log(err, "error");
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      {user2?.uid ? (
        <App />
      ) : (
        <div className="div">
          <div className="mainDiv">
            <h1 className="h1">SIGN UP</h1>
            <form className="mainDiv form" onSubmit={onSubmit}>
              <input className="input" value={email} onChange={(e) => setEmail(e.target.value)}
              type="text" placeholder="Email Id" />
              <input className="input" value={password} onChange={(a) => setPassword(a.target.value)}
              type="Password" placeholder="Password" />
              {/* {email && password === ""?
              <p>The email and password are empty Please filled it</p>
              :
              // email === ""?
              <p>The email or password is empty Please filled it</p>
              // password === ""?
              // <p>The password is empty Please filled it</p>:
              // false
            } */}
              <button className="button10" onSubmit={onSubmit} onClick={logUp}>
                Sign Up
              </button>
            </form>
              <p className="p">
                Already have an Account? <a href="/">Login</a>
              </p>
          </div>
        </div>
      )}
    </div>
  );
};
export default SignUp;