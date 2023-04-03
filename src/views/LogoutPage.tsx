import styled from "styled-components";
import Header from "../organisms/Header/Header";
import { LogoutSection } from "../organisms/LogoutSection/LogoutSection";

const Wrapper = styled.div`
    width: 100vw;
`;

export const LogoutPage = () => {
    return(
        <Wrapper>
            <Header />
            <LogoutSection />
        </Wrapper>
    )
}