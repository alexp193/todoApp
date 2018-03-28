import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/core';


import { NgRedux, select } from '@angular-redux/store';

import { IAppState } from '../../store/index';
import { Todos } from '../../shared/todos-interface';
import { Lists } from '../../shared/todos-interface';

import { actions } from '../../store/actions';
import { debuglog, isArray, isObject } from 'util';
import { Observable } from 'rxjs/Observable';
import { PACKAGE_ROOT_URL } from '@angular/core/src/application_tokens';
import { ActivatedRoute } from '@angular/router';


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


  public todos: Todos;
  public list: Lists;
  public newTodos: Todos;
  private listId: any;

  private subscribers: any[];
  state: string = 'extra-large';

  @select() todos$: Observable<Todos>;
  @select() list$: Observable<Lists>;
  @select() update$: Observable<Lists>;


  constructor(public ngRedux: NgRedux<IAppState>,
    private activatedRoute: ActivatedRoute) {
    this.subscribers = [];

    this.activatedRoute.params.subscribe(params => {

      this.listId = Number(params.id);
      this.ngRedux.dispatch({ type: actions.UPDATE_ID, id: this.listId });

      if (this.todos) {
        this.showTodos();
      }
    });

  }

  onBlur(e, item, keyV): void {
    item[keyV] = e.target.innerHTML;
    this.ngRedux.dispatch({ type: actions.UPDATE_LIST, todo: item });
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
    this.todos$.subscribe(data => {
      this.newTodos = data;
      this.showTodos();
    });


  }

  showTodos() {
    this.todos = this.newTodos.filter(item => item.parentId === this.listId);
  }

  ngOnDestroy() {
    this.subscribers.forEach(subscriber => subscriber.unsubscribe());
  }


}
