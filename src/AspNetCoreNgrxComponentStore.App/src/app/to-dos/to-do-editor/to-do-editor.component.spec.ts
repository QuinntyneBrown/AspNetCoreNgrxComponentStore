import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoEditorComponent } from './to-do-editor.component';

describe('ToDoEditorComponent', () => {
  let component: ToDoEditorComponent;
  let fixture: ComponentFixture<ToDoEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToDoEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
