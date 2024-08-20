import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, map, distinctUntilChanged } from "rxjs";
import { initialState, TaskState } from "../../types/task.type";

@Injectable({ providedIn: 'root' })
export class TaskStore {
  private _state: BehaviorSubject<TaskState>;

  constructor() {
    this._state = new BehaviorSubject<TaskState>(initialState);
  }

  get state$(): Observable<TaskState> {
    return this._state.asObservable();
  }

  select<K>(selector: (state: TaskState) => K): Observable<K> {
    return this.state$.pipe(
      map(selector),
      distinctUntilChanged()
    );
  }
}