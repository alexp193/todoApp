import { actions } from "./actions";
import { Http, Response } from '@angular/http';
import { Injectable } from "@angular/core";
import { Todos } from '../shared/todos-interface'

@Injectable()
export class ProjectsMiddleware {
    public todos: Todos[];

    constructor(public http: Http) {

    }
    Call = () => next => action => {
        switch (action.type) {
            case actions.GET_LIST:

                this.http.get('http://localhost:3000/todos').map(r => r.json()).subscribe(data => {
                    return next({
                        type: actions.SET_LIST,
                        payload: data
                    })
                });

                break;

            case actions.ADD_TODO:
                console.log(action.todo)

                this.http.post('http://localhost:3000/todos', action.todo).subscribe((response) => {
                    this.http.get('http://localhost:3000/todos').map(r => r.json()).subscribe(data => {
                        return next({
                            type: actions.SET_LIST,
                            payload: data
                        })
                    });
                });
                break;

            case actions.UPDATE_LIST:
                console.log(action.todo)
                this.http.put(`http://localhost:3000/todos/${action.todo.id}`, action.todo)
                    .subscribe(data => {
                        return next(data)
                    }, error => console.log('Could not update todo.'));

                break;

            case actions.DELETE_ITEMS:
                this.http.delete(`http://localhost:3000/todos/${action.todo.id}`)
                    .subscribe((response) => {
                        this.http.get('http://localhost:3000/todos').map(r => r.json()).subscribe(data => {
                            return next({
                                type: actions.SET_LIST,
                                payload: data
                            })
                        });
                    });

                break;

            default:
                return next(action);
        }
    }
}