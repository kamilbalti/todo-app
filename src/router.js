import { BrowserRouter as Router, Route } from "react-router-dom";
import SignIn from "./signIn";
import SignUp from "./signUp";
import App from "./App";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react/cjs/react.development";
import firebase from "./firebase";
import { setUser } from "./store/action";

const Router2 = () => {
  const { user } = useSelector((e) => e?.reducer1);
  const dispatch = useDispatch();
  useEffect(() => {
    firebase.auth().onAuthStateChanged((isUser) => {
      console.log(isUser, "user1");
      dispatch(setUser(isUser));
      console.log(user);
    });
  }, []);
  console.log(user, "user");
  if (user === "loading")
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spinner animation="border" variant={"success"} />
      </div>
    );
    if(user === "user2"){
      return(
        // <SignIn />
        window.location.href="/"
      )
    }

  return (
    <Router>
      <Route exact path={"/"} component={SignIn} />
      <Route path={"/SignUp"} component={SignUp} />
    </Router>
  );
};

export default Router2;
