import { Component, forwardRef, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormArray, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator, Validators } from '@angular/forms';
import { ToDo } from '../to-do';

@Component({
  selector: 'app-to-do-editor',
  templateUrl: './to-do-editor.component.html',
  styleUrls: ['./to-do-editor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToDoEditorComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ToDoEditorComponent),
      multi: true
    }       
  ]
})
export class ToDoEditorComponent implements ControlValueAccessor,  Validator  {
  validate(control: AbstractControl): ValidationErrors {
    const error = { validate: true };
      
    if (!control.value && !control.pristine) {
      return error;
    }
    
    return null as any;
  }
  
  public form = new FormGroup({
    toDoId: new FormControl(),
    name: new FormControl(null, [Validators.required]),
    htmlBody: new FormControl(),
    completed: new FormControl()
  });
  
  writeValue(toDo: ToDo): void {   
    this.form.patchValue(toDo || {}, { emitEvent: false });
  }

  registerOnChange(fn: any): void {
    this.form.valueChanges.subscribe(fn);
  }
  
  onTouched = () => {
  
  };

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.form.disable() : this.form.enable();
  }
}
