import styled from 'styled-components';
import { Input } from '../../components/Input/Input';
import { TaskCard } from '../../molecules/TaskCard/TaskCard';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { useEffect, useState } from 'react';
import { fetchAllTasks } from '../../store/Tasks/tasksSlice';

const TaskInput = styled(Input)`
    margin-bottom: 30px;
`;

const TaskWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
`;

export const TasksSection :React.FC = () => {

    const tasks = useAppSelector(reducer => reducer.tasksReducer.tasks);
    const dispatch = useAppDispatch();    
    const [ searchTask, setSearchTask ] = useState('');
    let searchedTasks = [...tasks]; // robimy kopię tablicy żeby ją potem sortować,a oryginału nie ruszać

    const handleChange = (e :React.SyntheticEvent) => {
        e.preventDefault();
        const target = e.target as HTMLTextAreaElement;
        setSearchTask(target.value);
    }

    if(searchTask !== ""){
        const inputedValue = searchTask.toString().toLowerCase();
        searchedTasks = tasks.filter (task => 
            task.title.toLowerCase().includes(inputedValue) || task.brief.toLowerCase().includes(inputedValue)
        )
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

    useEffect(() => {
        dispatch(fetchAllTasks());
    },[]);

    return(
        <>
            <TaskInput placeholder="Wpisz nazwę zadania" value={searchTask} onChange={(e) => handleChange(e) } />
            <TaskWrapper>
                {
                    searchedTasks.map(task => (
                        <TaskCard 
                            key={task.id}
                            id={task.id}
                            title={task.title}
                            brief={task.brief}
                            taskTime={task.taskTime}
                            currentTime={task.currentTime}
                            currentTimeType={setTaskTime(task.currentTime/60)}
                            isActive={task.isActive}
                            isFinish={task.isFinish}
                        />
                    ))
                }
            </TaskWrapper>
        </>
    )
}