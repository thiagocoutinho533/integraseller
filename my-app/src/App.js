import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import EsqueciSenha from "./pages/EsqueciSenha";
import ResetarSenha from "./pages/ResetarSenha";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/esqueci-senha" element={<EsqueciSenha />} />
        <Route path="/resetar-senha/:token" element={<ResetarSenha />} />
      </Routes>
    </Router>
  );
}
export default App;
