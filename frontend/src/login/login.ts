import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

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

    constructor(private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar) {
        this.loginForm = this.fb.group({
            email: ["", [Validators.required]],
            password: ["", [Validators.required]]
        });
    }

    onSubmit() {
        if (this.loginForm.valid) {
            const userData = this.loginForm.value;
            console.log("login data:", userData);
            
            this.snackBar.open("Login successfully!", "Close", {
                duration: 5000,
                horizontalPosition: 'center',
                verticalPosition: 'top'
            });
            
            this.router.navigate(["/"]);
        }
    }
    togglePasswordVisibility() {
        this.hidePassword = !this.hidePassword;
    }
}
