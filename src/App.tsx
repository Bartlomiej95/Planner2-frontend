import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./theme/GlobalStyle";
import { theme } from "./theme/mainTheme";
import { HomePage } from "./views/HomePage";
import { LoginPage } from "./views/LoginPage";
import { RegisterPage } from "./views/RegisterPage";

function App() {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
          </Routes>
        </Router>

      </ThemeProvider>
    </>
  );
}

export default App;
