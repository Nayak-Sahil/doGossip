import "./App.css";
import { Identity } from "./components/custom/Identity";
import Nav from "./components/custom/Nav";
import Footer from "./components/custom/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Chat from "./components/custom/Chat";

function App() {
  return (
    <div className="w-screen h-screen bg-bg-home bg-opacity-35">
      <Nav />
        <Router>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <>
                  <Identity />
                </>
              }
            />
            <Route
              exact
              path="/chat"
              element={
                <>
                  <Chat />
                </>
              }
            />
          </Routes>
        </Router>
      <Footer />
    </div>
  );
}

export default App;
