import { Todos, Lists } from "../shared/todos-interface";

export interface IAppState {
    todos: Todos[],
    list: Lists[]
}

