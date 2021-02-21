import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
// import { useEffect } from "react/cjs/react.development";
import App from "./App";
import firebase from "./firebase";
import "./signIn.css";
import { setUser } from "./store/action";

const SignIn = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((e) => e?.reducer1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const logIn = () => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((res) => {
        setEmail("");
        setPassword("");
        console.log("res", res);
        dispatch(setUser(res?.user));
      })

      .catch((err) => {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 3000);
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    logIn()
  };

  // console.log(temp, "user")

  // useEffect(() => {
  //   dispatch(setUser(temp))
  // },[])

  return (
    <div>
      {user?.uid ? (
        <App />
      ) : (
        <div className="div">
          <div className="mainDiv">
            <h1 className="h1">LOGIN</h1>
            <form className="mainDiv form" onSubmit={onSubmit}>
              <input className="input" value={email} onChange={(e) => setEmail(e.target.value)}
                type="text" placeholder="Email Id" />
              <input className="input" value={password} onChange={(e) => setPassword(e.target.value)}
                type="password" placeholder="Password" />
              {error ? (
                <p className="para">
                  {"You made a Mistake in password or email"}
                </p>
              ) : (
                false
              )}
              <button className="button10" type={"submit"}>
                Log In
              </button>
            </form>
            <p className="p">
              Do not have an Account? <a href="signUp">Create one</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
export default SignIn;
