import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/core';


import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../store/index';
import { Todos } from '../../shared/todos-interface';
import { Lists } from '../../shared/todos-interface';

import { actions } from '../../store/actions';
import { debuglog } from 'util';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  animations: [
    trigger('myTrigger', [
      //   transition('* => *', animate('500ms')),
      transition('void => *', [
        style({ opacity: '0' }),
        animate('1500ms')
      ])

    ])
  ]
})
export class TodoListComponent implements OnInit {


  public todos: Todos[];
  private list: Lists[];
  private listId: number;
  private unsubscribe: () => void;
  state: string = 'extra-large';

  constructor(public ngRedux: NgRedux<IAppState>) {

  }

  onBlur(e, item, keyV): void {

    item[keyV] = e.target.innerHTML;
    this.ngRedux.dispatch({ type: actions.UPDATE_LIST, todo: item });
  }

  getTodos(): void {
    this.unsubscribe = this.ngRedux.subscribe(() => {
      const newList = this.ngRedux.getState().todos.todos;
      this.listId = this.ngRedux.getState().list.list.id
      this.todos = newList.filter(item => item.parentId === this.listId);
      this.state = "fadeIn";
    })
  }

  ToggleChecked(id: number): any {
    let obj = this.todos.find(item => {
      if (item.id === id) {
        item.done = !item.done;
        return item.id === id;
      }
    });

    this.ngRedux.dispatch({ type: actions.UPDATE_LIST, todo: obj });

  }

  ngOnInit() {
    this.getTodos();
  }

  ngOnDestroy() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }


}
