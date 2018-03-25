export interface Todos {
    parentId: number;
    id?: number;
    title: string;
    content: string;
    done?: boolean;
}

export interface Lists{
    id:number,
    title:string
}