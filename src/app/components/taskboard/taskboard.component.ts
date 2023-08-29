import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskserviceService } from 'src/app/services/taskservice.service';

@Component({
  selector: 'app-taskboard',
  templateUrl: './taskboard.component.html',
  styleUrls: ['./taskboard.component.css']
})
export class TaskboardComponent implements OnInit {
  data: any;
  newTask: any = {};  
  showAddForm: boolean = false;  
  searchKeyword: string = '';  
  filteredTasks: any[] = [];
  selectedPriority: string = 'all';

  constructor(private dataService: TaskserviceService,private router:Router) {}

  ngOnInit() {
    this.getTask();
  }

  getTask() {
    this.dataService.getTaskData().subscribe((res) => {
      this.data = res;
      this.filteredTasks = this.data;  
    });
  }

  toggleEditMode(task: any) {
    task.editMode = !task.editMode;
    if (task.editMode) {
      task.updatedTitle = task.Title;
      task.updatedDescription = task.Description;
      task.updatedDueDate = task.DueDate;
      task.updatedPriority = task.Priority;
    }
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
  }

  addTask() {
    this.dataService.addTask(this.newTask).subscribe(
      () => {
        console.log('Task added successfully');
        alert("Task added Successfully")
        this.getTask();
        this.newTask = {};  
        this.showAddForm = false;  
      },
      (error) => {
        alert("Enter all fields")
        console.error('Error adding task:', error);
      }
    );
  }

  saveTask(task: any) {
    this.dataService.updateTask(task._id, {
      Title: task.updatedTitle,
      Description: task.updatedDescription,
      DueDate: task.updatedDueDate,
      Priority: task.updatedPriority
    }).subscribe(
      () => {
        console.log('Task updated successfully');
        alert("Task updated Successfully")
        task.Title = task.updatedTitle;
        task.Description = task.updatedDescription;
        task.DueDate = task.updatedDueDate;
        task.Priority = task.updatedPriority;
        task.editMode = false;
      },
      (error) => {
        console.error('Error updating task:', error);
      }
    );
  }
// Delete task Logic
  deleteTask(taskId: string) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.dataService.deleteTask(taskId).subscribe(
        () => {
          console.log('Task deleted successfully');
          this.getTask();
        },
        (error) => {
          console.error('Error deleting task:', error);
        }
      );
    }
  }
  // onsearch Logic
  onSearchChange() {
    if (this.searchKeyword || this.selectedPriority !== 'all') {
      this.filteredTasks = this.data.filter((task: Task) => {
        const keywordMatch =
          !this.searchKeyword ||
          task.Title.toLowerCase().includes(this.searchKeyword.toLowerCase()) ||
          task.Description.toLowerCase().includes(this.searchKeyword.toLowerCase());

        const priorityMatch =
          this.selectedPriority === 'all' ||
          task.Priority.toLowerCase() === this.selectedPriority.toLowerCase();

        return keywordMatch && priorityMatch;
      });
    } else {
      this.filteredTasks = this.data;
    }
  }

  highlightSearch(text: string): string {
    if (this.searchKeyword && text) {
      const searchRegExp = new RegExp(this.searchKeyword, 'gi');
      return text.replace(searchRegExp, match => `<span class="highlight">${match}</span>`);
    }
    return text;
  }
  // Logout Logic
  logOut(){
    alert("Logout Sucessfully")
    this.router.navigate(['login'])
  }
  
}

// task.interface.ts

export interface Task {
  _id: string;
  Title: string;
  Description: string;
  DueDate: string;
  Priority: string;
}
