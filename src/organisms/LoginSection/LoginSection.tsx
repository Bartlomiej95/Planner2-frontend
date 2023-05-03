import { useContext, useState } from "react";
import { useAppDispatch } from "../../utils/hooks";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { PrimaryBtn } from "../../components/Button/Button";
import { Heading, SubHeading } from "../../components/Heading/Heading";
import { Input } from "../../components/Input/Input";
import { Paragraph } from "../../components/Paragraph/Paragraph";
import { loginUser } from "../../store/Users/usersSlice";
import { MessageModal } from "../../molecules/Modal/MessageModal";

const Wrapper = styled.section`
    width: 100%;
    height: calc(100vh - 50px);
`;

const LoginSectionHeading = styled(Heading)`
    margin-top: 100px;
    margin-bottom: 10px;
`;

const LoginSectionSubHeading = styled(SubHeading)`
    margin-top: 80px;
    margin-bottom: 30px;
`;

const LoginParagraph = styled(Paragraph)`
    text-align: center;
`;


export const LoginSection = () => {

    const [ email, setEmail] = useState('');
    const [ password, setPassword] = useState('');
    const [ popup, setPopup ] = useState('');
    const [ loginError, setLoginError ] = useState('');
    const dispatch = useAppDispatch();
    const nav = useNavigate();

    const handleClick = (e: React.SyntheticEvent) => {
        try {
            e.preventDefault();

            const logIn = async () => {
                const payload = await dispatch(loginUser({email, password})).then(res => res.payload);
                const { message, id } = payload;
                if(message){
                    setPopup("Error");
                    setLoginError(message);
                    setTimeout(() => setPopup(""), 3000);  
                } else if(id) {
                    setPopup("Success");
                    setTimeout(() => setPopup(""), 3000);
                    nav('/dashbord/user');
                }
            }
            logIn();            
        } catch (error) {
            console.error(error);
        }
    }
    
    return(
        <Wrapper>
             <LoginSectionHeading>Zaloguj się</LoginSectionHeading>
             <LoginParagraph>Nie pamiętasz hasła? Wygeneruj nowe</LoginParagraph>
             <form>
                <Input name="email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input name="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <PrimaryBtn onClick={(e) => handleClick(e)}> Zaloguj się </PrimaryBtn>
             </form>
             <LoginSectionSubHeading>Nie masz konta?</LoginSectionSubHeading>
            <PrimaryBtn onClick={() => nav('/register')}>Zarejestruj się</PrimaryBtn>
            { popup === "Error" && <MessageModal type="Error" content={loginError} /> }  
            { popup === "Success" && <MessageModal type="Success" content="Pomyślnie zalogowano" /> }       
        </Wrapper>
    )
}