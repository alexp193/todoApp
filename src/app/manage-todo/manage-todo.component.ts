
import { Component, OnInit, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../store/index';
import { actions } from '../store/actions';
import { Lists, Todos } from '../shared/todos-interface';
import { isArray } from 'util';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { debounceTime } from 'rxjs/operator/debounceTime';
import { Observable } from 'rxjs/Observable';





@Component({
  selector: 'app-manage-todo',
  templateUrl: './manage-todo.component.html',
  styleUrls: ['./manage-todo.component.scss']
})
export class ManageTodoComponent implements OnInit {

  public lists: Lists = [];
  todoForm: FormGroup;
  public todos: Todos = [];

  @select('list') list$: Observable<Lists>;
  @select('todos') todos$: Observable<Todos>;


  public list = {
    id: 0,
    title: ""
  };

  private subscribers: any[];

  constructor(public ngRedux: NgRedux<IAppState>,
    private fb: FormBuilder,
    private router: ActivatedRoute) {
    this.subscribers = [];
  }


  onSubmit({ value, valid }): void {
    this.list.title = value.title;
    this.ngRedux.dispatch({ type: actions.ADD_LIST, list: this.list });
    this.todoForm.reset();
  }

  deleteList(id: number): void {
    this.ngRedux.dispatch({ type: actions.DELETE_LIST, id: id });

    this.todos.forEach((item) => {
      if (item.parentId === id) {
        this.ngRedux.dispatch({ type: actions.DELETE_ITEMS, todo: item });
      }
    });
  }

  ngOnInit() {
    this.subscribers.push(this.list$.subscribe(data => {
      if (isArray(data)) {
        this.lists = data;
      }
    }))

    this.subscribers.push(this.todos$.subscribe(data => {
      if (isArray(data)) {
        this.todos = data;
      }
    }))

    this.todoForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]]
    });



  }

  ngOnDestroy() {
    this.subscribers.forEach(subscriber => subscriber.unsubscribe());
  }

}
