import React, { useContext, useEffect } from "react";
import { Router } from "@reach/router";
import { ReactQueryDevtools } from "react-query/devtools";
import { UserContext } from "./context/user";
import { ToastContainer } from "react-toastify";
import timer from "./services/timer";
// Components
import Nav from "./components/nav";
// Pages
import Login from "./pages/login";
import Summary from "./pages/summary";
import Comments from "./pages/comments";
import Slides from "./pages/slides";
import Verify from "./pages/verify";
import Reset from "./pages/reset";
import NotFound from "./pages/404";
import FormTest from "./pages/form-test";

function App() {
  const { user } = useContext(UserContext);
  // Only display on dev
  process.env.NODE_ENV === "development" && console.log(user);

  useEffect(() => {
    user && user.role && timer();
  }, [user]);

  return (
    <>
      <ToastContainer autoClose={3000} />
      <Router>
        {/* <Login path="/login" /> */}
        {user && user.loggedIn && (
          <Nav path="/" user={user}>
            <Summary path="summary" user={user} />
            <Comments path="comments" />
            <Comments path="comments/:brand/:id" />
            <Slides path="slides" />
            <NotFound default />
          </Nav>
        )}
        {/* <NotFound default /> */}
        <Verify path="/verify/:token/:confirmation/:valid" />
        <Reset path="/reset/:token" />
        <FormTest path="/form-test/:id" />
        <Login default />
      </Router>
    </>
  );
}

export default App;
