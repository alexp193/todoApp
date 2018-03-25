
import { Component, OnInit, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store/index';
import { actions } from '../store/actions';
import { Lists } from '../shared/todos-interface';
import { isArray } from 'util';

@Component({
  selector: 'app-manage-todo',
  templateUrl: './manage-todo.component.html',
  styleUrls: ['./manage-todo.component.scss']
})
export class ManageTodoComponent implements OnInit {

  public lists: Lists[] = [];

  constructor(public ngRedux: NgRedux<IAppState>) {
  }



  getLists(): void {
    this.ngRedux.subscribe(() => {
      this.lists = this.ngRedux.getState().list && isArray(this.ngRedux.getState().list.list) ? this.ngRedux.getState().list.list : this.lists;
    })
  }

  executeList(list: object): void {
    this.ngRedux.dispatch({ type: actions.SHOW_TODOS_ITEMS, payload: list });
  }


  ngOnInit() {
    this.getLists();
  }

}
