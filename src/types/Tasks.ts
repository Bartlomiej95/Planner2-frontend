export interface ITask {
    id: string, 
    title: string,
    brief: string,
    guidelines: string,
    currentTime: number,
    taskTime: number,
    isActive: boolean,
    isFinish: boolean,
    project: string,
    user: string,
    company: string,
}

export type InitialNewTask = {
    title: string,
    brief: string,
    guidelines: string,
    project: string,
    user: string,
    taskTime: number,
}
