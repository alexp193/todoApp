
import { Component, OnInit, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store/index';
import { actions } from '../store/actions';
import { Lists, Todos } from '../shared/todos-interface';
import { Subscription } from 'rxjs/Subscription';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { debug } from 'util';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})

export class TodoComponent implements OnInit {

  @select() list$: Observable<Lists>;
  public title: any;
  private subscribers: any[];

  constructor(public ngRedux: NgRedux<IAppState>) {
    this.subscribers = [];
  }

  ngOnInit() {
    this.ngRedux.dispatch({
      type: actions.GET_LIST,
    })

    this.ngRedux.dispatch({
      type: actions.GET_MANAGE_LIST,
    })

    this.list$.subscribe(data => {
    })

  }


  ngOnDestroy() {
    this.subscribers.forEach(subscriber => subscriber.unsubscribe());
  }


}
