 // register.component.ts
 import { Component } from '@angular/core';
 import { HttpClient } from '@angular/common/http';
 import { Router } from '@angular/router';
import { TaskserviceService } from 'src/app/services/taskservice.service';
 
 @Component({
   selector: 'app-register',
   templateUrl: './register.component.html',
   styleUrls: ['./register.component.css']
 })
 export class RegisterComponent {
   username: string = '';
   email: string = '';
   password: string = '';
   show: boolean = false;
   constructor(private taskboard:TaskserviceService,private router:Router) {}
togglePassword() {
  this.show = !this.show;
}
   registerUser() {
     if (!this.validateInputs()) {
       return;
     }
   
     const userData = { username: this.username, email: this.email, password: this.password };
   
     this.taskboard.registerUser(userData).subscribe(
       (response: any) => {
         console.log(response.message);
         alert("Registered Successfully, Please Login")
         this.router.navigate(['login']);
       },
       (error: any) => {
         console.error(error);
       }
     );
   }
   
 
   validateInputs(): boolean {
     if (!this.username || !this.email || !this.password) {
       alert('All fields are required.');
       return false;
     }
     if (!this.isValidEmail(this.email)) {
       alert('Invalid email format.');
       return false;
     }
     return true;
   }
 
   isValidEmail(email: string): boolean {
     const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
     return emailPattern.test(email);
   }
 }
 
