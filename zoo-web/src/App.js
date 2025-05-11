import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Animais from "./pages/Animais";
import Cuidados from "./pages/Cuidados";
import Home from "./pages/Home";
import Estatisticas from "./pages/Estatisticas";
import FrequenciaCuidados from "./pages/FrequenciaCuidados";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/animais" component={Animais} />
        <Route path="/cuidados" component={Cuidados} />
        <Route path="/estatisticas" component={Estatisticas} />
        <Route path="/frequencia-cuidados" component={FrequenciaCuidados} />
      </Switch>
    </Router>
  );
}