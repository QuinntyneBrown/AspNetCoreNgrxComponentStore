import { Injectable, Inject } from '@angular/core';
import { baseUrl } from '@core/constants';
import { HttpClient } from '@angular/common/http';
import { ToDo } from './to-do';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {
 
  constructor(
    @Inject(baseUrl) private _baseUrl: string,
    private _client: HttpClient
  ) {  }

  public get(): Observable<ToDo[]> {
    return this._client.get<{ toDos: ToDo[] }>(`${this._baseUrl}api/to-dos`)
      .pipe(
        map(x => x.toDos)
      );
  }

  public getSince(lastModified?:string): Observable<ToDo[]> {
    return this._client.get<{ toDos: ToDo[] }>(`${this._baseUrl}api/to-dos/since/${lastModified}`)
      .pipe(
        map(x => x.toDos)
      );
  }

  public getById(options: { toDoId: string }): Observable<ToDo> {
    return this._client.get<{ toDo: ToDo }>(`${this._baseUrl}api/to-dos/${options.toDoId}`)
      .pipe(
        map(x => x.toDo)
      );
  }

  public remove(options: { toDo: ToDo }): Observable<void> {
    return this._client.delete<void>(`${this._baseUrl}api/to-dos/${options.toDo.toDoId}`);
  }

  public create(options: { toDo: ToDo }): Observable<{ toDo: ToDo }> {
    return this._client.post<{ toDo: ToDo }>(`${this._baseUrl}api/to-dos`, { toDo: options.toDo });
  }  

  public update(options: { toDo: ToDo }): Observable<{ toDo: ToDo }> {
    return this._client.put<{ toDo: ToDo }>(`${this._baseUrl}api/to-dos`, { toDo: options.toDo });
  }   
}