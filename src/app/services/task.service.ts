import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  ITask,
  ITaskTypeOption,
  ITypePercentage,
} from '../interface/task.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:8080/api/v1/task';

  constructor(private httpClient: HttpClient) {}

  getTaskList(): Observable<ITask[]> {
    return this.httpClient
      .get<ITask[]>(`${this.apiUrl}`)
      .pipe(map((data: ITask[]) => data));
  }

  postTaskList(task: ITask): Observable<ITask> {
    return this.httpClient
      .post<ITask>(`${this.apiUrl}`, task)
      .pipe(map((data: ITask) => data));
  }

  updateTask(task: ITask, id: string): Observable<ITask> {
    return this.httpClient
      .put<ITask>(`${this.apiUrl}/${id}`, task)
      .pipe(map((data: ITask) => data));
  }

  deleteTask(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }

  getTaskById(id: string): Observable<ITask> {
    return this.httpClient
      .get<ITask>(`${this.apiUrl}/${id}`)
      .pipe(map((data: ITask) => data));
  }

  getTypePercentage(): Observable<ITypePercentage[]> {
    return this.httpClient
      .get<ITypePercentage[]>(`${this.apiUrl}/vData/percentcounttype`)
      .pipe(map((data: ITypePercentage[]) => data));
  }

  getTypeOptions(): ITaskTypeOption[] {
    return [
      { type: 'done' },
      { type: 'todo' },
      { type: 'pending' },
    ];
  }
}
