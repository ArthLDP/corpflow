import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UserAuthLoginRequest } from '../entities/userEntity';
import { UserService } from '../services/userService';

@Component({
    selector: 'app-login',
    imports: [
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatSnackBarModule
    ],
    templateUrl: './login.html',
    styleUrl: './login.css',
})
export class Login {
    loginForm: FormGroup;
    hidePassword = true;

    constructor(private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar, private userService: UserService) {
        this.loginForm = this.fb.group({
            email: ["", [Validators.required]],
            password: ["", [Validators.required]]
        });
    }

    onSubmit() {
        if (this.loginForm.valid) {
            const user = this.loginForm.value as UserAuthLoginRequest;

            this.userService.loginUser(user).subscribe({
                next: (res) => {
                    this.userService.saveToken(res.token);
                    const userEmail = this.userService.getUserEmailFromToken(res.token);
                    this.userService.getUserByEmail(userEmail).subscribe({
                        next: (res) => {
                            this.userService.currentUserSignal.set(res);
                        },
                        error: (err) => {
                            console.error(err);
                        }
                    })
                },
                error: (err) => {
                    this.snackBar.open("Server error", "Close", {
                        duration: 5000,
                        horizontalPosition: 'center',
                        verticalPosition: 'top'
                    });

                    console.error(err);
                }
            });
        }
    }
    togglePasswordVisibility() {
        this.hidePassword = !this.hidePassword;
    }
}
