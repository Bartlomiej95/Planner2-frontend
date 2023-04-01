import styled from "styled-components";
import Header from "../organisms/Header/Header";
import { LoginSection } from "../organisms/LoginSection/LoginSection";

const Wrapper = styled.div`
    width: 100vw;
`;

export const LoginPage = () => {
    return(
        <Wrapper>
            <Header />
            <LoginSection />
        </Wrapper>
    )
}