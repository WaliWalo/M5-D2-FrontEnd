import "./App.css";
import Home from "./components/Home";
import { Container, Row } from "react-bootstrap";
function App() {
  return (
    <div className="App">
      <Container>
        <Row style={{ display: "flex", flexDirection: "column" }}>
          <Home />
        </Row>
      </Container>
    </div>
  );
}

export default App;
