import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ITask, ITaskTypeOption } from '../../../interface/task.interface';
import { TaskService } from '../../../services/task.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css'],
})
export class ShowComponent implements OnInit {
  taskForm: FormGroup;
  typeOptions: ITaskTypeOption[] = [];

  constructor(
    public dialogRef: MatDialogRef<ShowComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ITask,
    private fb: FormBuilder,
    private taskService: TaskService
  ) {this.taskForm = this.fb.group({
    title: ['', Validators.required],
    dueDate: ['', Validators.required],
    type: ['', Validators.required],
    description: ['', Validators.required],
  });}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      dueDate: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
    });

    this.typeOptions = this.taskService.getTypeOptions();
    this.showTask();
  }

  showTask() {
    if (this.data && this.data.id) {
      this.taskService.getTaskById(this.data.id).subscribe(
        (d: ITask | undefined) => {
          if (d) {
            this.taskForm.controls['title'].setValue(d.title || '');
            this.taskForm.controls['type'].setValue(d.type || '');
            this.taskForm.controls['dueDate'].setValue(
              d.dueDate ? new Date(d.dueDate).toISOString() : ''
            );
            this.taskForm.controls['description'].setValue(d.description || '');
          }
        },
        (error) => console.error(error)
      );
    } else {
      console.error('ID de datos no definido.');
    }
  }

  updateTask() {
    if (this.data.id) {
      this.taskService.updateTask(this.taskForm.value, this.data.id).subscribe(
        () => {
          this.dialogRef.close();
        },
        (error) => console.error(error)
      );
    }
  }

  onDeleteTask() {
    if (this.data.id) {
      this.taskService.deleteTask(this.data.id).subscribe(
        () => {
          this.dialogRef.close();
        },
        (error) => console.error(error)
      );
    }
  }
}
