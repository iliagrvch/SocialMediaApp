import { useState, useRef, useContext } from "react";
import { useHistory } from "react-router";
import classes from "./AuthForm.module.css";
import AuthContext from "../../store/auth-context";
import { Button } from "@mui/material";
import axios from "axios";
import useHttp from "../../hooks/use-http";
import { addUser } from "../../lib/api";
import InputField from "./InputField";
import { Fragment } from "react";
const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const emailRef = useRef();
  const descriptionRef = useRef();
  const cityRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();
  const { sendRequest, data } = useHttp(addUser);
  const apiKey = "AIzaSyAkKVLOKgqpPWSerKv7AcDB1-HWA3EfK_U";
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => {
      return !prevState;
    });
  };
  const authCtx = useContext(AuthContext);

  async function submitHandler(event) {
    event.preventDefault();
    setIsLoading(true);
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    let url = !isLogin
      ? `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`
      : `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;

    try {
      const response = await axios.post(
        url,
        {
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        },
        {
          "Content-Type": "application/json",
        }
      );
      console.log(response);
      setIsLoading(false);
      const token = response.data.idToken;
      const id = response.data.localId;
      console.log(token, id);
      const expTime = new Date(
        new Date().getTime() + parseInt(response.data.expiresIn) * 1000
      );
      if (!isLogin) {
        await sendRequest({
          name: nameRef.current.value,
          description: descriptionRef.current.value,
          city: cityRef.current.value,
          id: id,
        });
      }
      authCtx.login(token, expTime, id);
      history.replace("/");
    } catch (error) {
      setIsLoading(false);
      console.log(error.response);
    }

    console.log(authCtx);
  }
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div>
          <InputField
            label="email"
            inputref={emailRef}
            type="email"
            id="email"
          />
          <InputField
            label="password"
            inputref={passwordRef}
            type="password"
            id="password"
          />
          {!isLogin && (
            <Fragment>
              <InputField
                label="name"
                inputref={nameRef}
                type="name"
                id="name"
              />
              <InputField
                label="city"
                inputref={cityRef}
                type="city"
                id="city"
              />
              <InputField
                autoSize={true}
                label="Type about yourself"
                inputref={descriptionRef}
                type="description"
                id="description"
              />
            </Fragment>
          )}
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <Button type="submit">
              {isLogin ? "Login" : "Create Account"}
            </Button>
          )}
          <Button type="button" onClick={switchAuthModeHandler}>
            {isLogin ? "Create new account" : "Login with existing account"}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
