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

export type NewProject = {
    title: string,
    customer: string,
    value: number,
    hours: number,
    assumptions: string,
    content: string,
    deadline: string,
    users: string[] | [],
}

export type UpdateProject = NewProject & {
    id: string,
}