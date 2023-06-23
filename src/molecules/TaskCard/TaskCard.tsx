import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { SubSubHeading } from '../../components/Heading/Heading';
import { Paragraph } from '../../components/Paragraph/Paragraph';
import { SliderTask } from '../SliderTheme/SliderTheme';
import { useAppDispatch } from '../../utils/hooks';
import { finishTask, toggleActivateTask } from '../../store/Tasks/tasksSlice';
import { MessageModal } from '../Modal/MessageModal';

const Wrapper = styled.div<{ readonly isFinish: boolean }>`
    min-width: 315px;
    min-height: 100px;
    padding: 15px 20px;
    margin: 0 auto;
    box-shadow: 0px 2px 8px 2px rgba(0, 0, 0, 0.16);
    border-radius: 10px;
    margin-bottom: 25px;
    
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
`;

const HeaderTaskCard = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    margin-bottom: 12px;
`;

const MiddlePart = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
`;

const WrapperLoadingBar = styled.div`
    width: 275px;
    height: 2px;
    background-color: rgb(112,112,112, 0.4);
    margin: 12px 0 5px 0;
    cursor: pointer;
`;

const WrapperTimeTask = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
`;

const LoadingBar = styled.div<{ readonly percent: string, readonly activeTask: boolean}>`
    height: 2px;
    background-color: ${({ activeTask }) => activeTask ? 'green' : '#707070' };
    position: relative;
    width: ${props => props.percent};
`;

const CloseTaskParagraph = styled(Paragraph)<{ onClick: any }>`
    cursor: pointer;
    font-weight: 500;

    :hover{
        color: #0903B0;
    }
`;

interface Props {
    id: string,
    title: string;
    brief: string;
    taskTime: number;
    currentTime: number;
    currentTimeType: typeof initialTimeObject;
    isFinish: boolean;
    isActive: boolean;
}

const initialTimeObject = {
    hours: '00',
    minutes: '00',
    seconds: '00',
}

export const TaskCard: React.FC<Props> = ({ id, title, brief, taskTime, currentTime, currentTimeType, isFinish, isActive }) => {

    const [ activeTask, setActiveTask] = useState(false);
    const [ finishStatus, setFinishStatus ] = useState(isFinish);
    const [ currentlyTaskTime, setCurrentlyTaskTime ] = useState(currentTimeType);
    const [ timeForAllTask, setTimeForAllTask ] = useState(initialTimeObject);
    const [ percentCompleteOfTheTask, setPercentCompleteOfTheTask ] = useState(0);
    const [ popup, setPopup] = useState('');
    const [ errorTask, setErrorTask ] = useState("");

    const dispatch = useAppDispatch();

    useEffect(()=>{
        setTimeForAllTask(setTaskTime(taskTime));
        
    }, []);

    useEffect(() => {
        setPercentCompleteOfTheTask( countingPercentCompleteOfTheTask(taskTime, currentTime/60) );
    }, [activeTask]);

    const handleClick = (): void => {
        if(isFinish){
            return;
        }
        (async () =>{
             const response = await dispatch(toggleActivateTask(id)).then(res => res.payload);
             if(!response.task.isActive){
                setCurrentlyTaskTime(setTaskTime(response.task.currentTime/60));
                setPopup("Success");
                setErrorTask("Pomyślnie wyłączono zadanie")
             }else {
                setPopup("Success");
                setErrorTask("Pomyślnie aktywowano zadanie")
             }
             setTimeout(() => setPopup(""), 3000);
        })();
        setActiveTask(!activeTask);        
    }

    const setTaskTime = (time : any) => {
        const hours = Math.floor(time / 60);
        const minutes = Math.floor(time % 60);
        const seconds = Math.round(((time * 60) % 60));
        
        const stringHours = hours.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}); // ustawiamy taki format 00:00:00
        const stringMinutes = minutes.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
        const stringSeconds = seconds.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
       
        return {
            hours: stringHours,
            minutes: stringMinutes,
            seconds: stringSeconds,
        }
    };

    const countingPercentCompleteOfTheTask = (allTime : number, currentlyTime: number) => {
        let percent: number = ( (currentlyTime * 100) /  (allTime) );
        if(percent > 100){
            percent = 100;
        }
        return percent;
    };

    const handleUpdateTask = (e: React.SyntheticEvent): void => {
        e.preventDefault();
        (async () => {
            const payload = await dispatch(finishTask(id)).then(res => res.payload);
            if(payload.ok){
                setPopup("Success");
                setFinishStatus(true);
                setErrorTask(payload.message);
            } else {
                setPopup("Error");
                setErrorTask(payload.response.data.message);
            }       
            setTimeout(() => setPopup(""), 3000);
        })(); 
    };

    return(
        <>
            <Wrapper isFinish={isFinish}>
                <HeaderTaskCard>
                    <SubSubHeading onClick={() => console.log('click')} >{title}</SubSubHeading>
                    <SliderTask onClick={() => console.log('klik')} activeHandle={() => handleClick()} activeTask={activeTask} />
                </HeaderTaskCard>
                <MiddlePart> 
                    <Paragraph>{brief}</Paragraph>
                    <CloseTaskParagraph onClick={(e: React.SyntheticEvent) => handleUpdateTask(e)}>
                        { finishStatus === true ? 'Przywróć' : 'Zakończ' }
                    </CloseTaskParagraph>
                </MiddlePart>
                <WrapperLoadingBar>
                    <LoadingBar activeTask={activeTask} percent={`${percentCompleteOfTheTask}%`}/>
                </WrapperLoadingBar>
                <WrapperTimeTask>
                <Paragraph>{ `${currentlyTaskTime.hours}:${currentlyTaskTime.minutes}:${currentlyTaskTime.seconds}`}</Paragraph>
                <Paragraph>{`${timeForAllTask.hours}:${timeForAllTask.minutes}:${timeForAllTask.seconds} `}</Paragraph>
                </WrapperTimeTask>
            </Wrapper>
            { popup === "Error" && <MessageModal type="Error" content={errorTask} /> }  
            { popup === "Success" && <MessageModal type="Success" content={errorTask} /> } 
        </>
    )
}
