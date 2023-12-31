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
import { DetailsProject } from "./views/DetailsProject";
import { NewTaskPage } from "./views/NewTaskPage";
import { ChangePasswordPage } from "./views/ChangePasswordPage";
import { ResetPasswordPage } from "./views/ResetPasswordPage";
import { RetrievePassPage } from "./views/RetrievePassPage";
import { SampleLoginPage } from "./views/SampleLoginPage";

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
            <Route path="/dashbord/project/:name" element={<DetailsProject />}/>
            <Route path="/dashbord/task/new" element={<NewTaskPage/>} />
            <Route path="/changepass" element={<ChangePasswordPage/>} />
            <Route path="/reset" element={<ResetPasswordPage/>} />
            <Route path="/restart/:link" element={<RetrievePassPage/>} />
            <Route path="/sample-login" element={<SampleLoginPage/>} />

          </Routes>
        </Router>
      </ProviderUserContext>
      </ThemeProvider>
    </>
  );
}

export default App;
