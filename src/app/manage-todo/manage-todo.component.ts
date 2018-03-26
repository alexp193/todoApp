
import { Component, OnInit, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store/index';
import { actions } from '../store/actions';
import { Lists, Todos } from '../shared/todos-interface';
import { isArray } from 'util';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-manage-todo',
  templateUrl: './manage-todo.component.html',
  styleUrls: ['./manage-todo.component.scss']
})
export class ManageTodoComponent implements OnInit {

  public lists: Lists[] = [];
  todoForm: FormGroup;
  public todos: Todos[];


  public list: Lists = {
    id: 0,
    title: ""
  };

  constructor(public ngRedux: NgRedux<IAppState>,
    private fb: FormBuilder) {
  }


  onSubmit({ value, valid }): void {
    this.list.title = value.title;
    this.ngRedux.dispatch({ type: actions.ADD_LIST, list: this.list });
    this.todoForm.reset();
  }
  getLists(): void {
    this.ngRedux.subscribe(() => {
      this.lists = this.ngRedux.getState().list && isArray(this.ngRedux.getState().list.list) ? this.ngRedux.getState().list.list : this.lists;
      this.todos = this.ngRedux.getState().todos.todos;
    })
  }

  deleteList(id: number): void {
    this.ngRedux.dispatch({ type: actions.DELETE_LIST, id: id });

    this.todos.forEach((item) => {
      if (item.parentId === id) {
        this.ngRedux.dispatch({ type: actions.DELETE_ITEMS, todo: item });
      }
    });
  }

  executeList(list: object): void {
    this.ngRedux.dispatch({ type: actions.SHOW_TODOS_ITEMS, payload: list });
  }


  ngOnInit() {
    this.getLists();
    this.todoForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

}
