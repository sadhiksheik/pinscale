import {Route, Switch,Redirect} from 'react-router-dom';

import Dashboard from "./components/Dashboard"
import Profile from "./components/Profile"
import Transactions from "./components/Transactions"
import Login from "./components/Login"
import ProtectedRoute from "./components/ProtectedRoute"
import NotFound from "./components/NotFound"
import './App.css';

function App() {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Dashboard} />
      <ProtectedRoute exact path="/transactions" component={Transactions} />
      <ProtectedRoute exact path="/profile" component={Profile} />
      <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
    </Switch>
  );
}

export default App;
