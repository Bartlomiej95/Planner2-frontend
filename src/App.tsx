import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./theme/GlobalStyle";
import { theme } from "./theme/mainTheme";
import { ActivateUserPage } from "./views/ActivateUserPage";
import { HomePage } from "./views/HomePage";
import { LoginPage } from "./views/LoginPage";
import { RegisterPage } from "./views/RegisterPage";

function App() {

  let { link } = useParams();

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/activate/:link" element={<ActivateUserPage/>}/>
          </Routes>
        </Router>

      </ThemeProvider>
    </>
  );
}

export default App;
