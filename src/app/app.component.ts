import { Component, OnInit,trigger,state,style,transition,animate,keyframes } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from './store/index';
import { actions } from './store/actions';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent {


  constructor(public redux: NgRedux<IAppState>) {

  }



  ngOnInit() {

    this.redux.dispatch({
      type: actions.GET_LIST,
    })
  }


}
