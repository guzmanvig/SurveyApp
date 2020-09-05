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
        <Header as='h1' color='blue'>
          <Icon name='law' />
          Human Rights & Global Economy
        </Header>
        <Header as='h3'>
           Migrant Rights / Familiy separation in the U.S. <br/>
           Survey
        </Header>
        <Header as='h4'>
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
