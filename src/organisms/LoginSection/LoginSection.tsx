import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { PrimaryBtn } from "../../components/Button/Button";
import { Heading, SubHeading } from "../../components/Heading/Heading";
import { Input } from "../../components/Input/Input";
import { Paragraph } from "../../components/Paragraph/Paragraph";

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

    const nav = useNavigate();
    return(
        <Wrapper>
             <LoginSectionHeading>Zaloguj się</LoginSectionHeading>
             <LoginParagraph>Nie pamiętasz hasła? Wygeneruj nowe</LoginParagraph>
             <form>
                <Input/>
                <Input/>
                <PrimaryBtn> Zaloguj się </PrimaryBtn>
             </form>
             <LoginSectionSubHeading>Nie masz konta?</LoginSectionSubHeading>
            <PrimaryBtn onClick={() => nav('/register')}>Zarejestruj się</PrimaryBtn>        
        </Wrapper>
    )
}