import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToDoListComponent } from './to-do-list/to-do-list.component';
import { ToDoEditorComponent } from './to-do-editor/to-do-editor.component';
import { SharedModule } from '@shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToDoDetailComponent } from './to-do-detail/to-do-detail.component';

@NgModule({
  declarations: [ToDoListComponent, ToDoEditorComponent, ToDoDetailComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule
    
  ]
})
export class ToDosModule { }
