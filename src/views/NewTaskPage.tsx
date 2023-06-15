import styled from "styled-components";
import { useEffect, useState } from "react";
import Header from "../organisms/Header/Header"
import TextArea from "../components/TextArea/TextArea";
import Footer from "../organisms/Footer/Footer";
import { Heading, SubHeading } from "../components/Heading/Heading";
import { Input } from "../components/Input/Input"
import { PersonToProject } from "../molecules/PersonToProject/PersonToProject";
import { Paragraph } from "../components/Paragraph/Paragraph";
import { PrimaryBtn } from "../components/Button/Button";
import { InitialNewTask } from "../types/Tasks";
import { useLocation, useNavigate } from "react-router-dom";
import { IUser } from "../types/Users";
import { createNewTask } from "../store/Tasks/tasksSlice";
import { useAppDispatch } from "../utils/hooks";
import { MessageModal } from "../molecules/Modal/MessageModal";

const AssignmentSection = styled.section`
    max-width: 275px;
    margin: 0 auto;
`;

const FormSection = styled.section`
    max-width: 275px;
    margin: 50px auto 0px auto;
`;

const ConfirmBtn = styled(PrimaryBtn)`
    margin: 40px auto;
`;

const ParagraphNote = styled(Paragraph)`
    color: #0903B0;
    text-align: center;
`;

const ParagraphRemark = styled(Paragraph)`
    color: red;
    text-align: center;
    font-weight: 700;
`;

const SpanNote = styled.span`
    font-weight: 700;
`;

const SubHeadingForm = styled(SubHeading)`
    margin: 30px auto;
`;

const initialTaskData: InitialNewTask = {
    title: '',
    brief: '',
    guidelines: '',
    project: '',
    user: '',
    taskTime: 0,
}

type LocState = {
    id: string, 
    title: string, 
    users: IUser[],
    hours: number,
}

export const NewTaskPage = () => {

    const [taskData, setTaskData] = useState(initialTaskData);
    const location = useLocation();
    const { id, title, users, hours }: LocState = location.state;
    const [ remainingProjectTime, setRemainingProjectTime ] = useState(Number(hours)*60); //pozpostały czas projektu w minutach stąd mnożenie 
    const [ popup, setPopup] = useState('');
    const [ taskError, setTaskError ] = useState('');
    const dispatch = useAppDispatch();
    const nav = useNavigate();

    useEffect(() => setTaskData({...taskData, project: id}), []);

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        console.log('taskData', taskData);
        try {
             (async () => {
                const payload = await dispatch(createNewTask(taskData)).then(res => res.payload);
                console.log(payload);
                if(payload.ok){
                    setPopup("Success");
                    setTimeout(() => {
                        nav('/dashbord/user');
                    },1);
                    console.log('success')
                } else {
                    setPopup("Error");
                    console.log("errror")
                }
                setTimeout(() => setPopup(""), 3000);
                setTaskError(payload.message);
             })();           
        } catch (error) {
            console.error(error);
        }
    }

    const handleChange = (e :React.SyntheticEvent) => {
        e.preventDefault();
        const target = e.target as HTMLTextAreaElement ;

        // obsługujemy inputa w którym użytkownik podaje informajce ile minut przeznacza na zadanie. Automatycznie o tyle skracamy 
        // czas który pozostał do ukończenia całego projektu
        let remainingTime = Number(hours) * 60 - Number(target.value);

        if(target.name === "taskTime"){
            setRemainingProjectTime(Number((remainingTime).toFixed(2)));
        }  
        setTaskData({
            ...taskData,
            [target.name]: target.value,
        })
        
    }

    return(
        <>
            <Header />
            <Heading> {title} </Heading>
            <AssignmentSection>
                <SubHeading>Przydziel zadania do projektu</SubHeading>
                {
                    users.map(user => (
                        <PersonToProject 
                            key={user.id}
                            id={user.id}
                            firstName={user.firstName}
                            lastName={user.lastName}
                            position={user.position}
                            assignUserToProject={ () => setTaskData({ ...taskData, user: user.id })}
                            isEdited={false}
                        />
                    ))
                }
            </AssignmentSection>
            <FormSection>
                <form id="task-form" onSubmit={(e) => handleSubmit(e)}>
                    <Input placeholder="Nazwa zadania" type="string" name="title" value={taskData.title} onChange={(e) => handleChange(e)} />
                    <Input placeholder="Skrócony opis zadania" type="string" name="brief" value={taskData.brief} onChange={(e) => handleChange(e)} />
                    <Input placeholder="Podaj czas pracy w minutach" type="number" name="taskTime" value={taskData.taskTime} onChange={(e) => handleChange(e)} />
                    {
                        remainingProjectTime < 0 ? ( 
                            <ParagraphRemark> Przekroczono limit czasu przeznaczonego na projekt!</ParagraphRemark>
                        ) : ( 
                            <ParagraphNote><SpanNote>Uwaga!</SpanNote> W ramach tego projektu <br/>zostało do zagospodarowania <SpanNote>{Math.floor(remainingProjectTime/60)} godzin {(remainingProjectTime % 60).toFixed(0)} minut</SpanNote></ParagraphNote>
                        )
                    }
                    <SubHeadingForm>Opisz zakres pracy<br /> w ramach zadania</SubHeadingForm>
                    <TextArea placeholder="Treść wiadomości" name="guidelines" value={taskData.guidelines} onChange={(e) => handleChange(e)} />
                    <ConfirmBtn form="task-form">Zatwierdź zadanie</ConfirmBtn>
                </form>
            </FormSection>
            { popup === "Error" && <MessageModal type="Error" content={taskError} /> }  
            { popup === "Success" && <MessageModal type="Success" content="Stworzono nowe zadanie" /> } 
            <Footer/>
        </>
    )
}