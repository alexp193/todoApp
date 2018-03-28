
import { actions } from '../actions';
import { Todos } from '../../shared/todos-interface';
import { Lists } from '../../shared/todos-interface'



const todosInitialState: Todos = [];
const listInitialState: Lists = [];

export function todoReducer(state: Todos = todosInitialState, action: any) {
    switch (action.type) {
        case actions.SET_LIST:
        case actions.UPDATE_DELETED_LIST:
            return action.payload;
        default:
            return state;
    }
}

export function listReducer(state: Lists = listInitialState, action: any) {
    switch (action.type) {
        case actions.SET_MANAGE_LIST:
            return action.payload;
        default:
            return state;
    }
}


export function updateReducer(state: Lists = listInitialState, action: any) {
    switch (action.type) {
        case actions.UPDATE_ID:
            return action.id;
        default:
            return state;
    }
}

