import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UserService } from '../services/userService';
import { UserAuthRegisterRequest } from '../entities/userEntity';

@Component({
    selector: 'app-signup',
    imports: [
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatSnackBarModule
    ],
    templateUrl: './signup.html',
    styleUrl: './signup.css',
})
export class Signup implements OnInit {
    signupForm: FormGroup;
    hidePassword = true;

    constructor(private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar, private userService: UserService) {
        this.signupForm = this.fb.group({
            name: ["", [Validators.required]],
            email: ["", [Validators.required, Validators.email]],
            password: ["", [Validators.required]]
        });
    }

    ngOnInit(): void {
        if (this.userService.isAuthenticated()) this.router.navigate(['/']);
    }

    onSubmit() {
        if (this.signupForm.invalid) {
            return;
        }

        const user = this.signupForm.value as UserAuthRegisterRequest;

        this.userService.registerUser(user).subscribe({
            next: (res) => {
                this.snackBar.open("Account created successfully!", "Close", {
                    duration: 5000,
                    horizontalPosition: 'center',
                    verticalPosition: 'top'
                });

                this.router.navigate(["/"]);
            },
            error: (err) => {
                this.snackBar.open(err.error.message, "Close", {
                    duration: 5000,
                    horizontalPosition: 'center',
                    verticalPosition: 'top'
                });

                console.error(err);
            }
        });
    }
    togglePasswordVisibility() {
        this.hidePassword = !this.hidePassword;
    }
}
