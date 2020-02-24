import React from "react";
import Chat from "./components/Chat/Chat";
import Join from "./components/Join/Join";
import Admin from "./components/Admin/Admin";
import Admindashboard from "./components/Admin-Dashboard/Admindashboard";
import Notfound from "./components/Notfound/Notfound";
import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={Join} />
      <Route path="/chat" component={Chat} />
      <Route path="/admin" component={Admin} />
      <Route path="/admin-dashboard" component={Admindashboard} />
    </Router>
  );
};

export default App;
