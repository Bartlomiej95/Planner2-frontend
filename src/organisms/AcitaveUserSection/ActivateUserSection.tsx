import styled from "styled-components";
import { ActivateUserForm } from "../../molecules/ActivateUserForm/ActivateUserForm";

const Wrapper = styled.section`
    width: 100%;
`;


export const ActivateUserSection = () => {
    return(
        <Wrapper>
            <ActivateUserForm />
        </Wrapper>
    )
}