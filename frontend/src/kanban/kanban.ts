import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTimepickerModule } from '@angular/material/timepicker';
import dayjs from 'dayjs';

interface Task {
    id: number;
    title: string;
    description: string;
    deadlineDate: Date;
    deadlineTime: Date;
    deadlineText: string;
}

@Component({
    selector: 'app-kanban',
    imports: [
        ReactiveFormsModule,
        DragDropModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        MatSnackBarModule,
        MatDatepickerModule,
        MatTimepickerModule,
        MatNativeDateModule
    ],
    templateUrl: './kanban.html',
    styleUrl: './kanban.css',
})
export class Kanban implements OnInit {
    todoTasks: Task[] = [];
    executingTasks: Task[] = [];
    finishedTasks: Task[] = [];

    taskForm: FormGroup;
    showForm = false;
    nextId = 1;
    minDate: Date;

    constructor(
        private fb: FormBuilder,
        private snackBar: MatSnackBar
    ) {
        this.taskForm = this.fb.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            deadlineDate: ['', Validators.required],
            deadlineTime: ['', Validators.required]
        });
        this.minDate = new Date();
    }

    ngOnInit() {
        this.loadTasks();
    }

    loadTasks() {
        console.log("Beta test");
    }

    saveTasks() {
        const tasks = {
            todo: this.todoTasks,
            executing: this.executingTasks,
            finished: this.finishedTasks,
            nextId: this.nextId
        };

        console.log(tasks);
    }

    toggleForm() {
        this.showForm = !this.showForm;
        if (!this.showForm) {
            this.taskForm.reset();
        }
    }

    addTask() {
        if (this.taskForm.valid) {
            let deadlineDate = new Date(this.taskForm.value.deadlineDate);
            let deadlineTime = new Date(this.taskForm.value.deadlineTime);
            
            deadlineDate.setHours(deadlineTime.getHours());
            deadlineDate.setMinutes(deadlineTime.getMinutes());
            deadlineDate.setSeconds(deadlineTime.getSeconds());
            deadlineDate.setMilliseconds(deadlineTime.getMilliseconds());

            let deadlineText = dayjs(deadlineDate).format('DD/MM/YYYY HH:mm');

            const newTask: Task = {
                id: this.nextId++,
                title: this.taskForm.value.title,
                description: this.taskForm.value.description,
                deadlineDate: this.taskForm.value.deadlineDate,
                deadlineTime: this.taskForm.value.deadlineTime,
                deadlineText: deadlineText
            };

            this.todoTasks.push(newTask);
            this.saveTasks();
            this.taskForm.reset();
            this.showForm = false;

            this.snackBar.open('Task added successfully!', 'Close', {
                duration: 2000,
                horizontalPosition: 'center',
                verticalPosition: 'top'
            });
        }
    }

    drop(event: CdkDragDrop<Task[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex
            );
        }
        this.saveTasks();
    }

    deleteTask(list: Task[], task: Task) {
        const index = list.indexOf(task);
        if (index > -1) {
            list.splice(index, 1);
            this.saveTasks();
            this.snackBar.open('Task deleted', 'Close', {
                duration: 2000,
                horizontalPosition: 'center',
                verticalPosition: 'top'
            });
        }
    }
}