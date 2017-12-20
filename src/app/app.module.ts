import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpModule } from '@angular/http';
import { TagInputModule } from 'ng2-tag-input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { IAppState } from './store/IAppState';
import { NgReduxModule, NgRedux } from 'ng2-redux';
import { ProjectsMiddleware } from './store/middleware';
import { combineReducers, applyMiddleware } from 'redux';
import { reducer } from './store/reducers/todosActions';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { EditableModule } from 'ng2-editable';






@NgModule({
  declarations: [
    AppComponent,
    TodoFormComponent,
    TodoListComponent
  ],
  imports: [
    BrowserModule,
    NgReduxModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    EditableModule,
    BrowserAnimationsModule
  ],
  providers: [ProjectsMiddleware],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(
    private middleware: ProjectsMiddleware,
    public ngRedux: NgRedux<IAppState>) {

    this.ngRedux.configureStore(rootReducer, <IAppState>{}, [middleware.Call]);
  }
}

const rootReducer = combineReducers<IAppState>({
  'todos': reducer,
});
