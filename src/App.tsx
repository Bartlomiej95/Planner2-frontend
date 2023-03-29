import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./theme/GlobalStyle";
import { theme } from "./theme/mainTheme";
import { HomePage } from "./views/HomePage";

function App() {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
          </Routes>
        </Router>

      </ThemeProvider>
    </>
  );
}

export default App;
