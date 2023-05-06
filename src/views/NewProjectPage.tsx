import React, { useState } from "react";
import styled from "styled-components";
import { PrimaryBtn } from "../components/Button/Button";
import { Heading, SubHeading } from "../components/Heading/Heading";
import { Input } from "../components/Input/Input";
import TextArea from "../components/TextArea/TextArea";
import Header from "../organisms/Header/Header"
import { IProject } from "../types/Projects";

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
    tasks: [],
    departments:[],
}

type newProject = Omit<IProject, "id">;

export const NewProjectPage = () => {

    const [projectData, setProjectData] = useState<newProject>(initialNewProject);

    const handleChange = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const target = e.target as HTMLInputElement;
        
        setProjectData({
            ...projectData,
            [target.name]:target.value
        });
    }

    return(
        <>
            <Header />
            <ProjectFormWrapper>
                <Heading>Nowy projekt</Heading>
                <Form id="project-form">
                    <Input placeholder="Nazwa projektu" type="string" name="title" onChange={ (e) => handleChange(e) } value={projectData.title} />
                    <Input placeholder="Klient" type="string" name="customer" onChange={ (e) => handleChange(e)} value={projectData.customer} />
                    <Input placeholder="Termin oddania projektu" type="date" name="deadline" onChange={ (e) => handleChange(e) } value={projectData.deadline} />
                    <Input placeholder="Ilość godzin na projekt" type="number" name="hours" onChange={ (e) => handleChange(e) } value={projectData.hours} />
                    <Input placeholder="Wartość projektu w PLN" type="number" name="projectValue" onChange={ (e) => handleChange(e) } value={projectData.value} />
                    <SubHeading>Opisz założenia projektowe</SubHeading>
                    <TextArea placeholder="Treść wiadomości" name="assumptions" onChange={(e) => handleChange(e)} value={projectData.assumptions} />
                </Form>
               
            </ProjectFormWrapper>
            <MarksSection>
                <SubHeading>Przekaż wytyczne<br /> dotyczące projektu</SubHeading>
                <TextArea placeholder="Treść wiadomości" form="project-form" name="content" onChange={(e) => handleChange(e)} value={projectData.content} />
            </MarksSection>
            <CreateBtn form="project-form">Utwórz projekt</CreateBtn>
        </>
    )
}