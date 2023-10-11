import styled from 'styled-components';
import * as api from '../../api/index';
import { ProjectCard } from '../../molecules/ProjectCard/ProjectCard';
import { SubHeading } from '../../components/Heading/Heading';
import { useContext, useEffect, useState } from 'react';
import { Paragraph } from '../../components/Paragraph/Paragraph';
import { TasksSection } from '../TasksSection/TasksSection';
import { InnerNavbar } from '../../molecules/InnerNavbar/InnerNavbar';
import { UserContext } from '../../context/UserContext';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { IUser, Role } from '../../types/Users';
import { PrimaryBtn } from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { fetchUsersFromCompany } from '../../store/Users/usersSlice';
import { fetchAllProjects, fetchProjectsForUser } from '../../store/Projects/projectsSlice';
import { IProject } from '../../types/Projects';
import { ArchivesCard } from '../../molecules/ArchivesCard/ArchivesCard';


const Wrapper = styled.main`
    min-height: 100vh;
`;

const WrapperNavbar = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-around;
    width: 80%;
    margin: 0 auto;
`;

const NavSubHeading = styled(SubHeading)`
    font-size: 12px;
    color: #0903B0;
`;

const WrapperProjectCard = styled.div`
    width: 100%;
    margin-top: 42px;
`;

const WrapperHelpdeskInfo = styled.div`
    width: 50%;
    height: 200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
`;

const ParagraphHelpdesk = styled(Paragraph)`
    margin-top: 14px;
`;

const SpanHelpdesk = styled.span`
    font-weight: 700;
    cursor: pointer;
`;

const BtnCreateProject = styled(PrimaryBtn)`
    width: 214px;
    margin-bottom: 45px;
`;

const PMSubHeading = styled(SubHeading)`
    margin-bottom: 30px;
`;

enum MainSectionType {
    Project = 'project',
    Archives = 'archives',
    ProjectManager = "projectManager",
    Tasks = 'tasks',
    Data = 'data',
}

export const MainSection = () => {

    const [typeOfMainSection, setTypeOfMainSection] = useState(MainSectionType.Project);
    const [userData, setUserData] = useState<IUser>();
    const loggedInUser = useAppSelector(reducer => reducer.usersReducer.user);
    const projects = useAppSelector(reducer => reducer.projectsReducer.projects) as IProject[];
    const { user, setUser} = useContext(UserContext);
    const nav = useNavigate();
    const dispatch = useAppDispatch();
    

    useEffect(() => {
        user ? setUserData(user as IUser) : setUserData(loggedInUser as IUser);       
    }, [user, loggedInUser]);

    useEffect(() => {
        dispatch(fetchUsersFromCompany());        
        dispatch(fetchProjectsForUser());
    }, 
    []);

    useEffect(() => {
        if(typeOfMainSection === MainSectionType.ProjectManager){
            dispatch(fetchAllProjects());
        }
    },[typeOfMainSection])

    if(!userData || Object.keys(userData).length === 0){
        return(
            <h2>Wczytywanie danych...</h2>
        )
    } else{
        return(
        <Wrapper>
            <WrapperNavbar>
                <InnerNavbar 
                    typeFn={ (typeOfMainSection: React.SetStateAction<MainSectionType>) => setTypeOfMainSection(typeOfMainSection)}
                    valueOfType={typeOfMainSection} 
                    userRole={userData.role}
                />
            </WrapperNavbar>
            {
                typeOfMainSection === MainSectionType.Project && ( 
                    <WrapperProjectCard>
                        {
                            projects.map(project => (
                                <ProjectCard
                                    key={project.id}
                                    id={project.id}
                                    title={project.title}
                                    customer={project.customer}
                                    deadline={project.deadline}                                
                                />
                            ))
                        }
                    </WrapperProjectCard>
                ) 
            }
            {
                typeOfMainSection === MainSectionType.Archives && (
                    <WrapperProjectCard>
                        {/* <ArchivesCard />
                        <ArchivesCard />
                        <ArchivesCard /> */}
                        <SubHeading>Archiwum</SubHeading>
                    </WrapperProjectCard>
                )
            }
            {
                typeOfMainSection === MainSectionType.Tasks && (
                    <WrapperProjectCard>
                       <TasksSection />
                    </WrapperProjectCard>
                )
            }
            {
                (userData.role === Role.manager || userData.role === Role.owner ) && (typeOfMainSection === MainSectionType.ProjectManager) && (
                    <WrapperProjectCard>
                       <BtnCreateProject onClick={() => nav('/dashbord/project/new')} > Dodaj nowy projekt </BtnCreateProject>
                       <PMSubHeading>Aktualne projekty</PMSubHeading>
                       {
                            projects.map(project => (
                                <ArchivesCard 
                                    key={project.id}
                                    id={project.id}
                                    title={project.title}
                                    customer={project.customer}
                                    deadline={project.deadline}
                                    hours={project.hours}
                                    value={project.value}
                                    content={project.content}
                                    assumptions={project.assumptions}
                                    users={project.users}
                                />
                            ))
                       }
                    </WrapperProjectCard>
                )
            }
            <WrapperHelpdeskInfo>
                <SubHeading>Masz problem z obsługą planera?</SubHeading>
                <ParagraphHelpdesk> <SpanHelpdesk>Zgłoś się</SpanHelpdesk> do naszego helpdesku</ParagraphHelpdesk>
            </WrapperHelpdeskInfo>
        </Wrapper>
    )
    }

    
}