import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { replace } from '@core/replace';
import { DialogService } from '@shared/dialog.service';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { ToDo } from '../to-do';
import { ToDoDetailComponent } from '../to-do-detail/to-do-detail.component';
import { ToDoService } from '../to-do.service';
import { pluckOut } from '@core/pluck-out';
import { ComponentStore } from '@ngrx/component-store';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss'],
  providers: [
    ComponentStore
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToDoListComponent implements OnDestroy {

  private readonly _destroyed: Subject<void> = new Subject();
  
  private readonly createToDo = this._componentStore.updater((state: { toDos: ToDo[] },toDo: ToDo) => {    
    state.toDos.push(toDo);
    return {
      toDos: state.toDos
    }
  });

  private readonly updateToDo = this._componentStore.updater((state: { toDos: ToDo[] },toDo: ToDo) => {    
    return {
      toDos: replace({ items: state.toDos, value: toDo, key: "toDoId" })
    }
  });

  private readonly deleteToDo = this._componentStore.updater((state: { toDos: ToDo[] },toDo: ToDo) => {    
    return {
      toDos: pluckOut({ items: state.toDos, value: toDo, key: "toDoId" })
    }
  });

  public readonly vm$: Observable<{
    dataSource$: Observable<MatTableDataSource<ToDo>>,
    columnsToDisplay: string[]
  }> = combineLatest([
    this._toDoService.get(),
    of(["name","completed","actions"])    
  ])
  .pipe(
    map(([toDos, columnsToDisplay]) => {

      this._componentStore.setState({ toDos });

      return {
        dataSource$: this._componentStore.select((state) => ({
          toDos: state.toDos,
        })).pipe(
          map(x => new MatTableDataSource(x.toDos))),
        columnsToDisplay
      }
    })
  );

  constructor(
    private readonly _toDoService: ToDoService,
    private readonly _dialogService: DialogService,
    private readonly _componentStore: ComponentStore<{ toDos: ToDo[] }>
  ) { }

  public edit(toDo: ToDo) {
    const component = this._dialogService.open<ToDoDetailComponent>(ToDoDetailComponent);
    component.toDo$.next(toDo);    
    component.saved
    .pipe(
      takeUntil(this._destroyed),
      tap(x => this.updateToDo(x))
    ).subscribe();
  }

  public create() {
    this._dialogService.open<ToDoDetailComponent>(ToDoDetailComponent)
    .saved
    .pipe(
      takeUntil(this._destroyed),
      tap(x => this.createToDo(x))
    ).subscribe();
  }

  public delete(toDo: ToDo) {    
    this.deleteToDo(toDo);
    this._toDoService.remove({ toDo }).pipe(
      takeUntil(this._destroyed) 
    ).subscribe();
  }
  
  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }
}
