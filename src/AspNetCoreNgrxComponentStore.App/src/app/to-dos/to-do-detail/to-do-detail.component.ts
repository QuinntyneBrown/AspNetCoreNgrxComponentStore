import { OverlayRef } from '@angular/cdk/overlay';
import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { ToDo } from '../to-do';
import { ToDoService } from '../to-do.service';

@Component({
  selector: 'app-to-do-detail',
  templateUrl: './to-do-detail.component.html',
  styleUrls: ['./to-do-detail.component.scss']
})
export class ToDoDetailComponent implements OnDestroy {

  private readonly _destroyed: Subject<void> = new Subject();

  public toDo$: BehaviorSubject<ToDo> = new BehaviorSubject(undefined);

  @Output() public saved = new EventEmitter(null);

  public vm$ = combineLatest([
    this.toDo$
  ]).pipe(
    map(([toDo]) => {
      return {
        form: new FormGroup({
          toDo: new FormControl(toDo, [])
        })
      }
    })
  )

  constructor(
    private readonly _overlayRef: OverlayRef,
    private readonly _toDoService: ToDoService) {     
  }

  public save(vm: { form: FormGroup}) {
    const toDo = vm.form.value.toDo;
    let obs$: Observable<{toDo: ToDo }>;
    if(toDo.toDoId) {
      obs$ = this._toDoService.update({ toDo })
    }   
    else {
      obs$ = this._toDoService.create({ toDo })
    } 

    obs$.pipe(
      takeUntil(this._destroyed),      
      tap(x => {
        this.saved.next(x.toDo);
        this._overlayRef.dispose();
      })
    ).subscribe();
  }

  public cancel() {
    this._overlayRef.dispose();
  }

  ngOnDestroy() {
    this._destroyed.complete();
    this._destroyed.next();
  }
}
