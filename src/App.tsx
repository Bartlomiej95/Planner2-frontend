import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { ProviderUserContext } from "./context/UserContext";
import GlobalStyle from "./theme/GlobalStyle";
import { theme } from "./theme/mainTheme";
import { ActivateUserPage } from "./views/ActivateUserPage";
import { HomePage } from "./views/HomePage";
import { LoginPage } from "./views/LoginPage";
import { LogoutPage } from "./views/LogoutPage";
import { NewProjectPage } from "./views/NewProjectPage";
import { RegisterPage } from "./views/RegisterPage";
import { UserPage } from "./views/UserPage";
import { EditProjectPage } from "./views/EditProjectPage";

function App() {


  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
      <ProviderUserContext>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/activate/:link" element={<ActivateUserPage/>}/>
            <Route path="/logout" element={<LogoutPage />}/>
            <Route path="/dashbord/user" element={<UserPage />}/>
            <Route path="/dashbord/project/new" element={<NewProjectPage />}/>
            <Route path="/dashbord/project/edit" element={<EditProjectPage />}/>
          </Routes>
        </Router>
      </ProviderUserContext>
      </ThemeProvider>
    </>
  );
}

export default App;
