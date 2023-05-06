import styled from 'styled-components';
import { ProjectCard } from '../../molecules/ProjectCard/ProjectCard';
import { SubHeading } from '../../components/Heading/Heading';
import { useContext, useEffect, useState } from 'react';
import { Paragraph } from '../../components/Paragraph/Paragraph';
import { TaskSection } from '../TasksSection/TasksSection';
import { InnerNavbar } from '../../molecules/InnerNavbar/InnerNavbar';
import { UserContext } from '../../context/UserContext';
import { useAppSelector } from '../../utils/hooks';
import { IUser, Role } from '../../types/Users';
import { PrimaryBtn } from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';


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
    const { user, setUser} = useContext(UserContext);
    const nav = useNavigate();
    

    useEffect(() => {
        user ? setUserData(user as IUser) : setUserData(loggedInUser as IUser);       
    }, [user, loggedInUser]);

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
                />
            </WrapperNavbar>
            {
                typeOfMainSection === MainSectionType.Project && ( 
                    <WrapperProjectCard>
                        <ProjectCard />
                        <ProjectCard />
                        <ProjectCard />
                    </WrapperProjectCard>
                ) 
            }
            {
                typeOfMainSection === MainSectionType.Archives && (
                    <WrapperProjectCard>
                        {/* <ArchivesCard />
                        <ArchivesCard />
                        <ArchivesCard /> */}
                        <h2>Archiwum</h2>
                    </WrapperProjectCard>
                )
            }
            {
                typeOfMainSection === MainSectionType.Tasks && (
                    <WrapperProjectCard>
                       <TaskSection />
                       <h2>Zadania</h2>
                    </WrapperProjectCard>
                )
            }
            {
                (userData.role === Role.manager || userData.role === Role.owner ) && typeOfMainSection === MainSectionType.ProjectManager && (
                    <WrapperProjectCard>
                       <BtnCreateProject onClick={() => nav('/dashbord/project/new')} > Dodaj nowy projekt </BtnCreateProject>
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