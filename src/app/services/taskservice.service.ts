import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskserviceService {
  private url = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.url}/register`, userData);
  }

  loginData(res1:any){
    return this.http.post('http://localhost:3000/login',res1)
  }
  getTaskData(): Observable<any> {
    return this.http.get(`${this.url}/tasks`);
  }

  addTask(task: any): Observable<any> {
    return this.http.post(`${this.url}/tasks`, task);
  }

  updateTask(taskId: string, updatedTask: any): Observable<any> {
    const url = `${this.url}/tasks/${taskId}`;
    return this.http.put(url, updatedTask);
  }

  deleteTask(taskId: string): Observable<any> {
    const url = `${this.url}/tasks/${taskId}`;
    return this.http.delete(url);
  }
}
