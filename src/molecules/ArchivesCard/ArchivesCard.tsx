import styled from "styled-components";
import { SubHeading } from "../../components/Heading/Heading";
import { Paragraph } from "../../components/Paragraph/Paragraph";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
    position: relative;
    width: 315px;
    min-height: 100px;
    padding: 13px 42px;
    margin: 0 auto;
    box-shadow: 0px 2px 8px 2px rgba(0, 0, 0, 0.16);
    border-radius: 10px;
    margin-bottom: 25px;
    background-color:  '#FFF';
`;

const CardHeading = styled(SubHeading)`
    text-align: left;
    margin-bottom: 10px;
`;

const WrapperLinkInCard = styled.div`
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 20px;
`;

const LinkInCard = styled(Paragraph)`
    color: #372FFF;
    font-weight: 600;
    cursor: pointer;
`;

interface Props {
    id: string,
    title: string,
    customer: string,
    deadline: string
    hours: number,
    value: number,
    content: string,
    assumptions: string
    users: string[],
}

export const ArchivesCard = ({ id, title, customer, deadline, hours, value, content, assumptions, users }: Props) => {

    const nav = useNavigate();

    
    return(
        <Wrapper>
            <CardHeading>{ title }</CardHeading>
            <WrapperLinkInCard>
                <LinkInCard onClick={() => nav('/dashbord/project/edit', { state: { id, title, customer, deadline, hours, value, content, assumptions, users } })}>Edytuj</LinkInCard>
                <LinkInCard onClick={() => nav('/dashbord/task/new', { state: { id, title, hours, users } }) }>Przydziel zadania</LinkInCard>
                <LinkInCard onClick={() => nav(`/dashbord/project/${title}`, { state: { id }})}>Szczegóły</LinkInCard>
            </WrapperLinkInCard>
        </Wrapper>
    )
}