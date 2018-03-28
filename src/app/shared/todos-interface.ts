export interface Todo {
    parentId: number;
    id?: number;
    title: string;
    content: string;
    done?: boolean;
}


export interface List {
    id: number,
    title: string
}

export declare type Lists = List[];
export declare type Todos = Todo[];

