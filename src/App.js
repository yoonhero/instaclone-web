import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import { isLoggedInVar, darkModeVar, client } from "./apollo";
import { ThemeProvider } from "styled-components";
import { darkTheme, GlobalStyles, lightTheme } from "./styles";
import SignUp from "./screens/SignUp";
import routes from "./routes";
import { HelmetProvider } from "react-helmet-async";
import Layout from "./components/Layout";
import Profile from "./screens/Profile";
import EditProfile from "./screens/EditProfile";
import SearchUsers from "./screens/SearchUsers";
import Explore from "./screens/Explore";
import UploadPhoto from "./screens/UploadPhoto";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <GlobalStyles />
          <Router>
            <Switch>
              <Route path={routes.home} exact>
                {isLoggedIn ? (
                  <Layout>
                    <Home />
                  </Layout>
                ) : (
                  <Login />
                )}
              </Route>
              {!isLoggedIn ? (
                <Route path={routes.signUp} exact>
                  <SignUp />
                </Route>
              ) : null}

              <Route path={`/users/:username`}>
                <Layout>
                  <Profile />
                </Layout>
              </Route>
              <Route path={`/edit/:username/`}>
                <Layout>
                  <EditProfile />
                </Layout>
              </Route>
              <Route path={`/search/:keyword/`}>
                <Layout>
                  <SearchUsers />
                </Layout>
              </Route>
              <Route path={"/explore"}>
                <Layout>
                  <Explore />
                </Layout>
              </Route>
              <Route path={"/upload"}>
                <Layout>
                  <UploadPhoto />
                </Layout>
              </Route>
              <Route>
                <Layout>
                  <NotFound />
                </Layout>
              </Route>
            </Switch>
          </Router>
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;
