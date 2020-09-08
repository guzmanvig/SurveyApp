import React from 'react';
import './App.css';
import { Container, Header, Icon} from 'semantic-ui-react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import Survey from "./Survey.js";
import Responses from "./Responses.js";


function App() {
  return (
    <div className="App">
      <Container textAlign='center' style={{ marginTop: "2em" }}>
        <Header as='h1' style={{ color: "#A20021" }}>
          <Icon name='law' />
          Human Rights & Global Economy
        </Header>
        <Header as='h3' style={{ color: "#080357" }}>
           Migrant Rights / Family separation in the U.S. <br/>
           Survey
        </Header>
        <Header as='h4' style={{ marginBottom: "5em", color: "#A20021" }}>
          Amelia Caramadre, Carly Gleichenhaus & Florencia Ces
        </Header>
      </Container>
      <Router>
        <Route exact path="/" component={Survey} />
        <Route exact path="/responses" component={Responses} />
      </Router>
    </div>
  );
}

export default App;
