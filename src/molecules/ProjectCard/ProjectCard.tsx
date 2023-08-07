import styled from 'styled-components';
import { SubSubHeading } from '../../components/Heading/Heading';
import { Paragraph } from '../../components/Paragraph/Paragraph';
import { PrimaryBtn } from '../../components/Button/Button';

const Wrapper = styled.div`
    position: relative;
    width: 305px;
    min-height: 130px;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    margin: 0 auto;
    box-shadow: 0px 2px 8px 2px rgba(0, 0, 0, 0.16);
    margin-bottom: 25px;
    border-radius: 10px;
    padding: 20px;
`;

const ProjectCardParagraph = styled(Paragraph)`
    margin: 15px 0;
`;

const LabelCard = styled.p`
    position: absolute;
    top: 8%;
    right: 8%;
    font-size: 12px;
    color: #0903B0;
    font-weight: 700;
`;

const ProjectCardBtn = styled(PrimaryBtn)`
    width: 100px;
    height: 32px;  
`;

interface IProps {
    id: string,
    title: string,
    customer: string,
    deadline: string,
}


export const ProjectCard = ({ id, title, customer, deadline} : IProps) => {
    return(
        <Wrapper>
            <SubSubHeading>{ customer }</SubSubHeading>
            <ProjectCardParagraph>{ title }</ProjectCardParagraph>
            <ProjectCardBtn>Projekt</ProjectCardBtn>
            <LabelCard>{deadline}</LabelCard>
        </Wrapper>
    )
}
