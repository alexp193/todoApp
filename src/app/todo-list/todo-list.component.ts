import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/core';


import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store/index';
import { Todos } from '../shared/todos-interface';
import { actions } from '../store/actions';


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
  state: string = 'extra-large';



  getState(l) {
            
  }

  toggleState() {
    // this.state = (this.state === 'small' ? 'large' : 'small');


  }
  saveEditable(value) {
    //call to http service
    console.log('http.service: ' + value);
  }

  constructor(public ngRedux: NgRedux<IAppState>) {

  }

  onBlur(e, item, ) {
    console.log(e)

    item.content = e.target.innerHTML;
    this.ngRedux.dispatch({ type: actions.UPDATE_LIST, todo: item });
  }

  getTodos() {
    this.ngRedux.subscribe(() => {
      this.todos = this.ngRedux.getState().todos.todos;
      
      this.state = "fadeIn"
    })
  }

  ToggleChecked(id) {
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


}
