import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../../store/IAppState';
import { Todos, Lists, Todo } from '../../shared/todos-interface';
import { actions } from '../../store/actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { isObject, isArray, debuglog } from 'util';





@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {

  public todos: Todos;
  private listId: number;
  todoForm: FormGroup;

  private unsubscribe: () => void;
  @select() update$: Observable<number>;
  @select() todos$: Observable<Todos>;


  constructor(private ngRedux: NgRedux<IAppState>,
    private fb: FormBuilder) {
  }

  DeleteItems(): void {
    for (var i = 0; i < this.todos.length; i++) {
      if (this.todos[i].done) {
        this.ngRedux.dispatch({ type: actions.DELETE_ITEMS, todo: this.todos[i] });
      }
    }
    this.todoForm.reset();
  }

  onSubmit({ value, valid }): void {

    let model: Todo = {
      parentId: this.listId,
      id: 0,
      title: "",
      content: "",
      done: false
    };

    model.content = value.content;
    model.title = value.title;
    this.ngRedux.dispatch({ type: actions.ADD_TODO, todo: model });
    this.todoForm.reset();
  }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      content: ['', [Validators.required, Validators.minLength(2)]]
    });

    this.update$.subscribe(data => {
      this.listId = data;
    });

    this.todos$.subscribe(data => {
      this.todos = data;
    });
  }

  ngOnDestroy() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
}
