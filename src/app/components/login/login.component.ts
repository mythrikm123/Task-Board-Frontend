import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TaskserviceService } from 'src/app/services/taskservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  formSubmitted = false;
  errorMessage = '';
  show: boolean = false;
  password: string='';
  constructor(private router: Router, private taskService: TaskserviceService) {}
//Show password
    togglePassword() {
      this.show = !this.show;
     }

  login() {
    this.formSubmitted = true;
    if (this.email && this.password) {
      const loginData = { email: this.email, password: this.password };
      this.taskService.loginData(loginData).subscribe(
        (data) => {
          alert('Login Successful');
          this.router.navigate(['task']);  
        },
        (error) => {
          if (error.status === 401) {
            alert('Invalid email or password')
            this.errorMessage = 'Invalid email or password';
          } else {
            this.errorMessage = 'An error occurred during login';
          }
        }
      );
    } else {
      alert("Please enter an email and password.")
      this.errorMessage = 'Please enter an email and password.';
    }
  }
}
