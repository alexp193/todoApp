import { actions } from "./actions";
import { Http, Response } from '@angular/http';
import { Injectable } from "@angular/core";

@Injectable()
export class ProjectsMiddleware {

    constructor(private http: Http) {

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

            case actions.GET_MANAGE_LIST:
                this.http.get('http://localhost:3000/list').map(r => r.json()).subscribe(data => {
                    return next({
                        type: actions.SET_MANAGE_LIST,
                        payload: data
                    })
                });
                break;

            case actions.ADD_LIST:
                this.http.post('http://localhost:3000/list', action.list).subscribe((response) => {
                    this.http.get('http://localhost:3000/list').map(r => r.json()).subscribe(data => {
                        return next({
                            type: actions.SET_MANAGE_LIST,
                            payload: data
                        })
                    });
                });
                break;

            case actions.ADD_TODO:
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

            case actions.DELETE_LIST:
                this.http.delete(`http://localhost:3000/list/${action.id}`)
                    .subscribe((response) => {
                        this.http.get('http://localhost:3000/list').map(r => r.json()).subscribe(data => {
                            return next({
                                type: actions.SET_MANAGE_LIST,
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