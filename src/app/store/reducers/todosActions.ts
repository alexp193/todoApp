
import { IAppState } from '../IAppState';
import { actions } from '../actions';
import { Todos } from '../../shared/todos-interface'


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

