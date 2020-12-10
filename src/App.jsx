import "./App.css";
import Home from "./components/Home";
import { Container } from "react-bootstrap";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Projects from "./components/Projects";
import NavBar from "./components/NavBar";
import StudentDetail from "./components/StudentDetail";
import ProjectDetail from "./components/ProjectDetail";
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
          <Route path="/projectDetail/:id" exact>
            <ProjectDetail />
          </Route>
        </Container>
      </Router>
    </div>
  );
}

export default App;
