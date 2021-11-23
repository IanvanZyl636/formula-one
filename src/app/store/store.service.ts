import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErgastStore } from './ergast/ergast.store';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  public readonly ergastStore = new ErgastStore(this._http);

  constructor(private _http: HttpClient) {}
}
