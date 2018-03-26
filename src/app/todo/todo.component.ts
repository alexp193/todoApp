
import { Component, OnInit, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store/index';
import { actions } from '../store/actions';
import { Lists } from '../shared/todos-interface';
import { Subscription } from 'rxjs/Subscription';



@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})

export class TodoComponent {
  public title: string = "";
  private subscriptions: Array<Subscription> = [];


  constructor(public ngRedux: NgRedux<IAppState>) {
    this.ngRedux = ngRedux;
  }

  ngOnInit() {
    this.ngRedux.dispatch({
      type: actions.GET_LIST,
    })

    this.ngRedux.dispatch({
      type: actions.GET_MANAGE_LIST,
    })

    this.ngRedux.subscribe(() => {
      this.title = this.ngRedux.getState().list.list.title;
    })
  }

}
