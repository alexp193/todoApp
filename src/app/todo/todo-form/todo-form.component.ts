import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { IAppState } from '../../store/IAppState';
import { Todos } from '../../shared/todos-interface';
import { actions } from '../../store/actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';




@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {
  //@select() todos;
  public todos: Todos[];
  private parentId:number;
  todoForm: FormGroup;


  model: Todos = {
    parentId:0,
    id: 0,
    title: "",
    content: "",
    done: false
  };


  constructor(private ngRedux: NgRedux<IAppState>, private fb: FormBuilder) { }

  DeleteItems() {
    for (var i = 0; i < this.todos.length; i++) {
      if (this.todos[i].done) {
        this.ngRedux.dispatch({ type: actions.DELETE_ITEMS, todo: this.todos[i] });
      }
    }

    // this.ngRedux.dispatch({
    //   type: actions.GET_LIST,
    // })

  }

  getTodos() {
    this.ngRedux.subscribe(() => {
      this.todos = this.ngRedux.getState().todos.todos;

    })
  }

  onSubmit({ value, valid }) {
    this.model.content = value.content;
    this.model.title = value.title;
    this.ngRedux.dispatch({ type: actions.ADD_TODO, todo: this.model });
    this.todoForm.reset();
  }

  ngOnInit() {
    this.getTodos();
    this.todoForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      content: ['', [Validators.required, Validators.minLength(2)]]
    });


  }

}
