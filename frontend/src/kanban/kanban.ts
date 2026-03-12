import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
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
import { MatSelectModule } from '@angular/material/select';
import dayjs from 'dayjs';
import { Task } from '../entities/taskEntity';
import { TaskStatus } from '../entities/enums/taskStatus';
import { User } from '../entities/userEntity';
import { UserService } from '../services/userService';
import { TaskService } from '../services/taskService';

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
        MatNativeDateModule,
        MatSelectModule
    ],
    templateUrl: './kanban.html',
    styleUrl: './kanban.css',
})
export class Kanban implements OnInit {
    taskForm: FormGroup;
    showForm = false;
    minDate = new Date();
    allUsers: User[] = [];
    tasks: Task[] = [];
    TaskStatus = TaskStatus;

    constructor(
        private userService: UserService,
        private taskService: TaskService,
        private snackBar: MatSnackBar,
        private fb: FormBuilder,
        private cdr: ChangeDetectorRef
    ) {
        this.taskForm = this.fb.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            deadlineDate: ['', Validators.required],
            deadlineTime: ['', Validators.required],
            userId: [null, Validators.required]
        });
    }

    get todoTasks(): Task[] {
        return this.tasks.filter(t => t.status === TaskStatus.TODO);
    }

    get executingTasks(): Task[] {
        return this.tasks.filter(t => t.status === TaskStatus.EXECUTING);
    }

    get finishedTasks(): Task[] {
        return this.tasks.filter(t => t.status === TaskStatus.FINISHED);
    }

    ngOnInit(): void {
        this.userService.getUsers().subscribe({
            next: (res) => {
                this.allUsers = [...res];
                this.cdr.markForCheck();
            },
            error: (err) => console.error('Error fetching users:', err)
        });

        this.taskService.getAllTasks().subscribe({
            next: (res) => {
                this.tasks = [...res];
                this.cdr.markForCheck();
            },
            error: (err) => console.error('Error fetching tasks:', err)
        });
    }

    toggleForm(): void {
        this.showForm = !this.showForm;
        if (!this.showForm) {
            this.taskForm.reset();
        }
    }

    addTask(): void {
        if (this.taskForm.invalid) return;

        const { title, description, deadlineDate, deadlineTime, userId } = this.taskForm.value;

        const deadLine = dayjs(deadlineDate)
            .hour(dayjs(deadlineTime).hour())
            .minute(dayjs(deadlineTime).minute())
            .format('DD/MM/YYYY HH:mm');

        const task: Task = {
            title,
            description,
            status: TaskStatus.TODO,
            deadLine,
            userId
        };

        this.taskService.createTask(task).subscribe({
            next: (res) => {
                this.tasks = [...this.tasks, res];
                this.cdr.markForCheck();
                this.taskForm.reset();
                this.showForm = false;
                this.snackBar.open('Task added successfully!', 'Close', {
                    duration: 2000,
                    horizontalPosition: 'center',
                    verticalPosition: 'top'
                });
            },
            error: (err) => console.error('Error creating task:', err)
        });
    }

    drop(event: CdkDragDrop<Task[]>): void {
        if (event.previousContainer === event.container) {
            moveItemInArray(
                event.container.data,
                event.previousIndex,
                event.currentIndex
            );
        } else {
            const task = event.previousContainer.data[event.previousIndex];
            const newStatus = this.getStatusFromContainer(event.container.id);

            if (newStatus !== undefined) {
                task.status = newStatus;
                this.taskService.updateTask(task).subscribe({
                    next: () => {
                        this.tasks = [...this.tasks];
                        this.cdr.markForCheck();
                    },
                    error: (err) => console.error('Error updating task status:', err)
                });
            }
        }
    }

    private getStatusFromContainer(containerId: string): TaskStatus | undefined {
        const map: Record<string, TaskStatus> = {
            'todoList': TaskStatus.TODO,
            'executingList': TaskStatus.EXECUTING,
            'finishedList': TaskStatus.FINISHED,
        };
        return map[containerId];
    }

    deleteTask(task: Task): void {
        this.taskService.deleteTask(task.id!).subscribe({
            next: () => {
                this.tasks = this.tasks.filter(t => t.id !== task.id);
                this.cdr.markForCheck();
                this.snackBar.open('Task deleted!', 'Close', {
                    duration: 2000,
                    horizontalPosition: 'center',
                    verticalPosition: 'top'
                });
            },
            error: (err) => console.error('Error deleting task:', err)
        });
    }

    getUserNameFromUserId(userId: number): string {
        const foundUser = this.allUsers.find(user => user.id === userId);

        if (foundUser) return foundUser.name;
        return "";
    }
}