
import { actions } from '../actions';
import { Todos } from '../../shared/todos-interface';
import { Lists } from '../../shared/todos-interface'



const initialState = null;

export function reducer(state: Todos | null = initialState, action: any) {
    switch (action.type) {
        case actions.SET_LIST:
            return Object.assign({}, state, { todos: action.payload });
        case actions.UPDATE_DELETED_LIST:
            return Object.assign({}, state, { todos: action.payload });
        default:
            return state;
    }
}

export function listReducer(state: Lists | null = initialState, action: any) {
    switch (action.type) {
        case actions.SET_MANAGE_LIST:
            return Object.assign({}, state, { list: action.payload });
        case actions.SHOW_TODOS_ITEMS:
            return Object.assign({}, state, { list: action.payload });
        default:
            return state;
    }
}

