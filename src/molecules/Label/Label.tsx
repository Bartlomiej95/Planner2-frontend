import styled from 'styled-components';

const Wrapper = styled.div`
    height: 24px;
    background-color: #F37B01;
    padding: 7px 14px;
    border-radius: 15px;
`;

const LabelName = styled.p`
    font-size: 10px;
    line-height: 10px;
    color: white;
    font-weight: 600;
`;

interface Props {
    division: String;
}

export const Label = ({ division } : Props) => {
    return(
        <Wrapper>
            <LabelName>{division}</LabelName>
        </Wrapper>
    )
}