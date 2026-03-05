import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { User } from '../services/userService';
import { UserAuthService } from '../services/userAuthService';

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
export class Signup {
    signupForm: FormGroup;
    hidePassword = true;

    constructor(private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar, private userAuthService: UserAuthService) {
        this.signupForm = this.fb.group({
            name: ["", [Validators.required]],
            email: ["", [Validators.required, Validators.email]],
            password: ["", [Validators.required]]
        });
    }

    onSubmit() {
        if (this.signupForm.invalid) {
            return;
        }

        const user = this.signupForm.value as User;

        console.log("Signup data:", user);

        this.userAuthService.registerUser(user).subscribe({
            next: (res) => {
                this.snackBar.open("Account created successfully!", "Close", {
                    duration: 5000,
                    horizontalPosition: 'center',
                    verticalPosition: 'top'
                });

                this.router.navigate(["/"]);
                console.log(res);
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
    togglePasswordVisibility() {
        this.hidePassword = !this.hidePassword;
    }
}
