import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpService {

  private server: string = 'http://localhost:3000';

  constructor(private httpSrv: Http) {

  }

  public get(method: string): Observable<any> {
    return this.httpSrv.get(`${this.server}/${method}`).map(r => r.json());
  }

  public post(method: string, params: any): Observable<any> {
    return this.httpSrv.post(`${this.server}/${method}`, params).map(r => r.json());
  }

  public put(method: string, params: any, action: any): Observable<any> {
    return this.httpSrv.put(`${this.server}/${method}/${params}`, action).map(r => r.json());
  }

  public delete(method: string, params: number): Observable<any> {
    return this.httpSrv.delete(`${this.server}/${method}/${params}`).map(r => r.json());
  }
}
