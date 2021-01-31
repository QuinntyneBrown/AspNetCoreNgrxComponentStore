import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { replace } from '@core/replace';
import { DialogService } from '@shared/dialog.service';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { ToDo } from '../to-do';
import { ToDoDetailComponent } from '../to-do-detail/to-do-detail.component';
import { ToDoService } from '../to-do.service';
import { pluckOut } from '@core/pluck-out';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToDoListComponent implements OnDestroy {

  private readonly _destroyed: Subject<void> = new Subject();

  private _toDos$: BehaviorSubject<ToDo[]> = new BehaviorSubject(undefined);

  public readonly vm$: Observable<{
    dataSource$: Observable<MatTableDataSource<ToDo>>,
    columnsToDisplay: string[]
  }> = combineLatest([
    this._toDoService.get(),
    of(["name","completed","actions"])    
  ])
  .pipe(
    map(([toDos, columnsToDisplay]) => {
      this._toDos$.next(toDos);
      return {
        dataSource$: this._toDos$.pipe(
          map(x => new MatTableDataSource(x))),
        columnsToDisplay
      }
    })
  );

  constructor(
    private readonly _toDoService: ToDoService,
    private readonly _dialogService: DialogService
  ) { }

  public edit(toDo: ToDo) {
    const component = this._dialogService.open<ToDoDetailComponent>(ToDoDetailComponent);
    component.toDo$.next(toDo);    
    component.saved
    .pipe(
      takeUntil(this._destroyed),
      tap(x => {
        this._toDos$.next(replace({ items: this._toDos$.value, value: x, key: "toDoId" }));
      })
    ).subscribe();
    
  }

  public create() {
    this._dialogService.open<ToDoDetailComponent>(ToDoDetailComponent)
    .saved
    .pipe(
      takeUntil(this._destroyed),
      tap(x => {
        this._toDos$.next([...this._toDos$.value, x]);
      })
    ).subscribe();
  }

  public delete(toDo: ToDo) {    
    this._toDos$.next(pluckOut({ items: this._toDos$.value, value: toDo, key: "toDoId" }));
    this._toDoService.remove({ toDo }).pipe(
      takeUntil(this._destroyed) 
    ).subscribe();
  }
  
  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }
}
