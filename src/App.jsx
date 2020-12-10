import "./App.css";
import Home from "./components/Home";
import { Container } from "react-bootstrap";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Projects from "./components/Projects";
import NavBar from "./components/NavBar";
import StudentDetail from "./components/StudentDetail";
function App() {
  return (
    <div className="App">
      <Router>
        <Container>
          <NavBar />
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/projects" exact>
            <Projects />
          </Route>
          <Route path="/studentDetail/:id" exact>
            <StudentDetail />
          </Route>
        </Container>
      </Router>
    </div>
  );
}

export default App;
