import styled, { css } from "styled-components";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { Heading, SubHeading } from "../components/Heading/Heading";
import Header from "../organisms/Header/Header";
import timeIcon from "../assets/timeIcon.svg";
import { IProject } from "../types/Projects";
import { getProject } from "../store/Projects/projectsSlice";
import { Paragraph } from "../components/Paragraph/Paragraph";
import { ProfabilityProjectSection } from "../organisms/ProfitabilityProjectSection/ProfitabilityProjectSection";
import { IUser, Role } from "../types/Users";
import { Person } from "../molecules/Person/Person";
import { fetchAllTasksInProject } from "../store/Tasks/tasksSlice";
import { ITask } from "../types/Tasks";
import { ShowTaskCard } from "../molecules/TaskCard/ShowTaskCard";

const Wrapper = styled.div`
    margin: 50px 36px 0 36px;

    @media(min-width: 600px ) {
        max-width: 600px;
        margin: 100px auto 0 auto;
    }

    @media(min-width: 1366px ) {
        max-width: 800px;
        margin: 100px auto 0 auto;
    }
`;

const DetailsSubHeading = styled(SubHeading)`
    margin: 50px 0;
`;

const DetailsParagraph = styled(Paragraph)`
    margin: 30px auto;
`;

const TimeProjectHeading = styled(SubHeading)`
    margin-bottom: 67px;
    margin-top: 50px;
`;

const TimeProjectWrapper = styled.div`
    margin: 0 auto 80px auto;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
`;

const LeftSide = styled.div`
    width: 35px;
    height: 35px;
    box-shadow: 0px 2px 8px 2px rgba(0, 0, 0, 0.16);
    border-radius: 5px;
    background-image: url(${timeIcon});
    background-repeat: no-repeat;
    background-position: center;
`;

const MiddleSide = styled.div`
    flex-grow: 3;
    margin-left: 30px;
`;

const TitleParagraph = styled(Paragraph)`
    font-weight: 800;
`;

const SubtitleParagraph = styled(Paragraph)`
    color: #A5A5A5;
`;

const WrapperNavbar = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    width: 95%;
    margin: 0 auto;
`;

const LinkInCard = styled(Paragraph)<{ readonly active: boolean}>`
    margin-top: 30px;
    font-size: 18px;
    color: #372FFF;
    font-weight: 600;
    cursor: pointer;
    
    :hover{
        text-decoration: underline;
    }

    ${({ active }) => active && css`
        text-decoration: underline;
    `}
`;


type editedLocState = {
    id: string,
}

enum DetailsProjectType {
    Spec = "Spec",
    Team = "Team",
    Tasks = "Tasks"
}

export const DetailsProject = () => {

    const [ typeOfDetails, setTypeOfDetails ] = useState(DetailsProjectType.Spec)
    const location = useLocation();
    const dispatch = useAppDispatch();
    const project = useAppSelector(reducer => reducer.projectsReducer.project) as IProject;
    const user = useAppSelector(reducer => reducer.usersReducer.user) as IUser;
    const usersInProject = project.users as IUser[];
    const tasks = useAppSelector(reducer => reducer.tasksReducer.tasks) as ITask[];
    const { id }: editedLocState = location.state;
    
    useEffect(() => {
       (async () => {
           await dispatch(getProject(id)).then(res => res.payload).catch(err => console.error(err));
           await dispatch(fetchAllTasksInProject(id));
       })();
    }, []);

    if(project === null){
        return(
            <h1>Loading ...</h1>
        )
    } else {
        return(
        <>
            <Header/>
                <Wrapper>
                    <Heading>{project.title}</Heading>
                    <WrapperNavbar>
                        <LinkInCard active={ typeOfDetails === DetailsProjectType.Spec} onClick={() => setTypeOfDetails(DetailsProjectType.Spec) }>Specyfikacja</LinkInCard>
                        <LinkInCard active={ typeOfDetails === DetailsProjectType.Team} onClick={() => setTypeOfDetails(DetailsProjectType.Team)}>Zespół</LinkInCard>
                        <LinkInCard active={ typeOfDetails === DetailsProjectType.Tasks} onClick={() => setTypeOfDetails(DetailsProjectType.Tasks)}>Zadania</LinkInCard>                        
                    </WrapperNavbar>
                    { typeOfDetails === DetailsProjectType.Spec && (
                        <>
                            <DetailsSubHeading>Specyfikacja projektowa</DetailsSubHeading>
                            <DetailsParagraph>
                                {project.assumptions} <br/>
                                {project.content}
                            </DetailsParagraph>
                            <DetailsSubHeading>{project.customer}</DetailsSubHeading>
                            <TimeProjectHeading>Czas pracy nad projektem</TimeProjectHeading>
                            <TimeProjectWrapper>
                                <LeftSide/>
                                <MiddleSide>
                                    <TitleParagraph>Realizacja</TitleParagraph>
                                    <SubtitleParagraph>W realizacji</SubtitleParagraph>
                                </MiddleSide>
                                <div>
                                    {project.hours}H
                                </div>
                            </TimeProjectWrapper>
                            <DetailsSubHeading>Zakres pracy <br/> w ramach projektu</DetailsSubHeading>
                            { user.role === Role.manager || user.role === Role.owner && 
                            (
                                <>
                                    <DetailsSubHeading>Rentowność projektu</DetailsSubHeading>
                                    <ProfabilityProjectSection projectValue={Number(project.value)} hours={Number(project.hours)} />
                                </>
                            )
                            }
                        </>
                        )
                    }
                    { typeOfDetails === DetailsProjectType.Team && (
                        <>
                            <DetailsSubHeading>Członkowie zespołu w projekcie</DetailsSubHeading>
                            {
                                usersInProject.map(user => (
                                    <Person 
                                        key={user.id}
                                        id={user.id}
                                        firstName={user.firstName}
                                        lastName={user.lastName}
                                        position={user.position}
                                    />
                                ))
                            }
                            
                        </>
                    )}
                    { typeOfDetails === DetailsProjectType.Tasks && (
                        <>
                            <DetailsSubHeading>Zadania do projektu</DetailsSubHeading>
                            {
                                tasks.map(task => (
                                    <ShowTaskCard 
                                        id={task.id}
                                        title={task.title}
                                        brief={task.brief}
                                        isFinish={task.isFinish}
                                        isActive={task.isActive}
                                    />
                                ))
                            }
                        </>
                    )}

                    
                </Wrapper>
        </>
        )
    }

    
}