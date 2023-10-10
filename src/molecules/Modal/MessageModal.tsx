import styled from "styled-components";

const ModalWrapper = styled.div<{type: string}>`
    width: 100vw;
    min-height: 30px;
    background-color: ${({type}) => type === "Error" ? "red" : "green"};
    color: white;
    position: fixed;
    bottom: 2%;

    @media(min-width: 780px){
        width: 200px;
        position: fixed;
        right: 2%;
        bottom: 90%;
        max-height: 50vh;
        padding-left:5px;
    }
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