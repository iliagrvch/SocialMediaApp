import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/Home";
import AuthPage from "./pages/Auth";
import ProfilePage from "./pages/Profile";
import AboutPage from "./pages/About";
import TweetDetailsPage from "./pages/TweetDetails";
import AuthContext from "./store/auth-context";
import { useContext } from "react";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          {authCtx.isLoggedIn ? <HomePage /> : <AuthPage />}
        </Route>
        <Route path="/auth">
          <AuthPage />
        </Route>
        <Route path="/about">
          <AboutPage />
        </Route>

        <Route path="/:userId/tweets/id=:tweetId">
          <TweetDetailsPage />
        </Route>
        <Route path="/:userId">
          <ProfilePage />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
