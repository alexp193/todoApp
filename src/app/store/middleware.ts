import { actions } from "./actions";
import { Injectable } from "@angular/core";
import 'rxjs/add/operator/map'
import { Observable } from "rxjs/Observable";
import { HttpService } from "../shared/http-service";


@Injectable()

export class ProjectsMiddleware {

    constructor(private httpSrv: HttpService) {
    }

    Call = () => next => action => {
        switch (action.type) {
            case actions.GET_LIST:
                this.httpSrv.get('todos').subscribe(data => {
                    return next({
                        type: actions.SET_LIST,
                        payload: data
                    })
                });
                break;

            case actions.GET_MANAGE_LIST:
                this.httpSrv.get('list').subscribe(data => {
                    return next({
                        type: actions.SET_MANAGE_LIST,
                        payload: data
                    })
                });
                break;
            case actions.ADD_LIST:
                this.httpSrv.post('list', action.list).subscribe((response) => {
                    this.httpSrv.get('list').subscribe(data => {
                        return next({
                            type: actions.SET_MANAGE_LIST,
                            payload: data
                        })
                    });
                });
                break;
            case actions.ADD_TODO:
                this.httpSrv.post('todos', action.todo).subscribe((response) => {
                    this.httpSrv.get('todos').subscribe(data => {
                        return next({
                            type: actions.SET_LIST,
                            payload: data
                        })
                    });
                });
                break;
            case actions.UPDATE_LIST:
                this.httpSrv.put('todos', action.todo.id, action.todo)
                    .subscribe(data => {
                        return next(data)
                    }, error => console.log('Could not update todo.'));
                break;

            case actions.DELETE_ITEMS:
                this.httpSrv.delete('todos', action.todo.id)
                    .subscribe((response) => {
                        this.httpSrv.get('todos').subscribe(data => {
                            return next({
                                type: actions.SET_LIST,
                                payload: data
                            })
                        });
                    });
                break;

            case actions.DELETE_LIST:
                this.httpSrv.delete('list', action.id)
                    .subscribe((response) => {
                        this.httpSrv.get('list').subscribe(data => {
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