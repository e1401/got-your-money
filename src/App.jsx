import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Navbar from './components/Navbar';
import { useAuthContext } from './hooks/useAuthContext';

function App() {
  const { authIsReady } = useAuthContext();

  console.log(authIsReady);

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
          </Switch>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
