import styled from "styled-components";
import { PrimaryBtn } from "../components/Button/Button";
import { Heading } from "../components/Heading/Heading";
import { Input } from "../components/Input/Input";
import Header from "../organisms/Header/Header";

const Wrapper = styled.section`
    width: 100%;
`;

const RegisterHeading = styled(Heading)`
    width: 80vw;
    margin: 50px auto 20px auto;
`;

const RegisterBtn = styled(PrimaryBtn)`
    margin-top: 20px;
`;

export const RegisterPage = () => {
    return(
        <Wrapper>
            <Header />
            <RegisterHeading>Formularz rejestracyjny</RegisterHeading>
            <form>
                <Input type="email"/>
                <RegisterBtn>Zarejestruj się</RegisterBtn>
            </form>
        </Wrapper>
    )
}