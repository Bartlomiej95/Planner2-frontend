export interface IProject {
    id: string;
    title: string;
    customer: string;
    deadline: string;
    hours: number;
    value: number;
    content: string;
    assumptions: string;
    users: string[] | [];
    tasks: string[] | [];
    departments: string[] | [];
}