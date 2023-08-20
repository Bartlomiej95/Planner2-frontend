import styled from 'styled-components';
import userIcon from '../../assets/user.svg';
import { SubHeading } from '../../components/Heading/Heading';
import { Paragraph } from '../../components/Paragraph/Paragraph';

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: start;
    align-items: center;
    margin: 15px auto;
    width: 90%;

    :first-of-type{
        margin-top: 50px;
    }
`;

const BorderImg = styled.div`
    position: relative;
    width: 51px;
    height: 51px;
    border: 2px solid #372FFF;
    border-radius: 50%;
    background-color: transparent;
`;

const Img = styled.div<{ readonly icon: string}>`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background-image: url(${({ icon }) => icon});
    
`;

const MiddleDiv = styled.div`
    margin-left: 50px;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
`;

interface IProps {
    id: string
    firstName: string, 
    lastName: string,
    position: string,
}


export const Person = ({ id, firstName, lastName, position }: IProps) => {

    return(
        <Wrapper>
             <BorderImg>
                 <Img icon={userIcon} />
             </BorderImg>
             <MiddleDiv>
                <SubHeading>{firstName} {lastName}</SubHeading>
                <Paragraph>{position}</Paragraph>
             </MiddleDiv>
        </Wrapper>
    )
}