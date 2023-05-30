import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { PrimaryBtn } from "../components/Button/Button";
import { Heading, SubHeading } from "../components/Heading/Heading";
import { Input } from "../components/Input/Input";
import TextArea from "../components/TextArea/TextArea";
import Header from "../organisms/Header/Header"
import { LabelSection } from "../organisms/LabelSection/LabelSection";
import { NewProject } from "../types/Projects";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { IUser } from "../types/Users";
import { PersonToProject } from "../molecules/PersonToProject/PersonToProject";
import { createNewProject } from "../store/Projects/projectsSlice";
import { MessageModal } from "../molecules/Modal/MessageModal";

const ProjectFormWrapper = styled.div`
    max-width: 275px;
    margin: 50px auto 0 auto;
`;

const Form = styled.form`
    margin-top: 51px;
`;

const MarksSection = styled.section`
    max-width: 275px;
    margin: 50px auto 0px auto;
`;

const AssignmentSection = styled.section`
    max-width: 275px;
    margin: 0 auto;
`;

const CreateBtn = styled(PrimaryBtn)`
    margin-bottom: 40px;
`;

const initialNewProject = {
    title: "",
    customer: "",
    deadline: "",
    hours: 0,
    value: 0,
    content: '',
    assumptions: '',
    users: [],
}

type editedLocState = {
    id: string,
    title: string, 
    customer: string, 
    deadline: string,
    hours: number,
    value: number,
    content: string, 
    assumptions: string,
    users: IUser[],
}

export const NewProjectPage = (props: any) => {

    const [projectData, setProjectData] = useState<NewProject>(initialNewProject);
    const [ status, setStatus] = useState(false);
    const [ userFromActiveDepartments, setUserFromActiveDepartments] = useState<IUser[]>([]);
    const [ assignPerson, setAssignPerson ] = useState<string[]>([]);
    const [ popup, setPopup] = useState('');
    const [ projectError, setProjectError ] = useState('');
    const [ isEdited, setIsEdited ] = useState(false);
    const [ dataFromEditWasLoaded, setDataFromEditWasLoaded ] = useState(false);
    const departments = useAppSelector(companiesSlice => companiesSlice.companiesReducer.departments);
    const usersInCompany = useAppSelector(usersReducer => usersReducer.usersReducer.usersInCompany);
    const dispatch = useAppDispatch();
    const nav = useNavigate();
    const location = useLocation();
    const { id, title, customer, deadline, hours, value, content, assumptions, users }: editedLocState = location.state;
    const usersId = users.map(user => user.id);
    const nameActiveDepartments = departments.map(item => {
        if(item.isActive){
            return item.name;
        }
    }).filter(item => item) as string[];
    
    useEffect(() => {
        if(id){ 
            setIsEdited(true);
            setProjectData({ title, customer, deadline, hours, value, content, assumptions, users: usersId});
            setAssignPerson(usersId);
            setDataFromEditWasLoaded(true);
        }
    }, []);
    
    useEffect(() => {
         const searchedUsers = usersInCompany.map(user => {
            if(nameActiveDepartments.includes(user.department)){
                return user;
            }
        }).filter(user => user) as IUser[];
        setUserFromActiveDepartments(searchedUsers);
        assignmentValidity();
    
    }, [status]);

    const handleChange = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const target = e.target as HTMLInputElement;
        
        setProjectData({
            ...projectData,
            [target.name]:target.value
        });
    }

    const handleAssignmentUserToProject = (id: string) => {
         // sprawdzamy czy jakiś użytkownik nie został wcześniej do projektu przypisany
         if(typeof assignPerson !== "undefined" && assignPerson.length > 0){
            const foundExistingId = assignPerson.includes(id);
            
            if(foundExistingId){
                // jeśli istnieje, to musimy go usunąć z tablicy
                const filteredArray = assignPerson.filter(item => item !== id );
                
                setProjectData({
                    ...projectData,
                    users: filteredArray
                })
                return setAssignPerson(filteredArray) // zwracamy tablicę bez usuniętego id              
            }
        }

        setAssignPerson([...assignPerson, id]);
        setProjectData({
            ...projectData,
            users: [...assignPerson, id],
        })
    }

    const assignmentValidity = () => {

        if(!dataFromEditWasLoaded){
            // turn off this validation function for first rendering edited project 
            return;
        }
        const newArrayOfAssignPerson = assignPerson;
        const stillAssignmentPerson = usersInCompany.map(user => {
            if(newArrayOfAssignPerson.includes(user.id)){
                if(nameActiveDepartments.includes(user.department)){
                    return user.id;
                }
            }
        }).filter(item => item) as string[];
        
        setAssignPerson(stillAssignmentPerson);
    }

    const handleSubmit = (e: React.SyntheticEvent) => {
        try {
            e.preventDefault();
            const newProject = async () => {
                const payload = await dispatch(createNewProject(projectData)).then(res => res.payload);
                if(payload.ok){
                    setPopup("Success");
                    setTimeout(() => {
                        nav('/dashbord/user');
                    },1);
                } else {
                    setPopup("Error");
                }
                setTimeout(() => setPopup(""), 3000);
                setProjectError(payload.message);
            }
            newProject();

        } catch (error) {
            console.log(error);
        }
    }

    return(
        <>
            <Header />
            <ProjectFormWrapper>
                <Heading>
                    {
                        isEdited ? title : "Nowy projekt"
                    }
                </Heading>
                <Form id="project-form" onSubmit={(e) => handleSubmit(e)}>
                    <Input placeholder="Nazwa projektu" type="string" name="title" onChange={ (e) => handleChange(e) } value={projectData.title} />
                    <Input placeholder="Klient" type="string" name="customer" onChange={ (e) => handleChange(e)} value={projectData.customer} />
                    <Input placeholder="Termin oddania projektu" type="date" name="deadline" onChange={ (e) => handleChange(e) } value={projectData.deadline} />
                    <Input placeholder="Ilość godzin na projekt" type="number" name="hours" onChange={ (e) => handleChange(e) } value={projectData.hours} />
                    <Input placeholder="Wartość projektu w PLN" type="number" name="value" onChange={ (e) => handleChange(e) } value={projectData.value} />
                    <SubHeading>Opisz założenia projektowe</SubHeading>
                    <TextArea placeholder="Treść wiadomości" name="assumptions" onChange={(e) => handleChange(e)} value={projectData.assumptions} />
                </Form>
            </ProjectFormWrapper>
            <LabelSection title="Wybierz dział odpowiedzialny za projekt" category="department" changeStatus={() => setStatus(!status)}/>
            <AssignmentSection>
                <SubHeading>Przypisz osoby <br /> pracujące przy projekcie</SubHeading>
                {
                    userFromActiveDepartments.map(item => 
                        <PersonToProject 
                            key={item.id}
                            id={item.id}
                            firstName={item.firstName}
                            lastName={item.lastName}
                            position={item.position}
                            assignUserToProject={ () => handleAssignmentUserToProject(item.id)}
                            isEdited={usersId.includes(item.id)}
                        />
                    )
                }
            </AssignmentSection>
            <MarksSection>
                <SubHeading>Przekaż wytyczne<br /> dotyczące projektu</SubHeading>
                <TextArea placeholder="Treść wiadomości" form="project-form" name="content" onChange={(e) => handleChange(e)} value={projectData.content} />
            </MarksSection>
            <CreateBtn form="project-form">{ isEdited ? "Edytuj projekt" : "Utwórz projekt" }</CreateBtn>
            { popup === "Error" && <MessageModal type="Error" content={projectError} /> }  
            { popup === "Success" && <MessageModal type="Success" content="Stworzono nowy projekt" /> } 
        </>
    )
}