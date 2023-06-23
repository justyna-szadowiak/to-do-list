import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdManagerService {
  private _lastTaskId: number = 0;

  constructor() { }

  get lastTaskId() {
    return this._lastTaskId;
  }

  set lastTaskId(value: number) {
    this._lastTaskId = value;
  }
}
