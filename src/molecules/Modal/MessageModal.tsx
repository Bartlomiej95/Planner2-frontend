import styled from "styled-components";

const ModalWrapper = styled.div<{type: string}>`
    width: 100vw;
    min-height: 30px;
    background-color: ${({type}) => type === "Error" ? "red" : "green"};
    color: white;
    position: fixed;
    bottom: 2%;
`;

type Props = {
    type: string,
    content: string
}

export const MessageModal = ({type, content}: Props)=> {


    return(
        <ModalWrapper type={type}>
            <p>{content}</p>
        </ModalWrapper>
    )
}