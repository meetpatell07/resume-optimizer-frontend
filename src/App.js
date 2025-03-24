import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import JobDescriptionPage from './pages/JobDescriptionPage';
import ResumeGenerationPage from './pages/ResumeGenerationPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/job-description" component={JobDescriptionPage} />
        <Route path="/resume-generation" component={ResumeGenerationPage} />
      </Switch>
    </Router>
  );
}

export default App;
