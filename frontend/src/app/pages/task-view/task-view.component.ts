import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { List } from 'src/app/models/list.model';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss'],
})
export class TaskViewComponent implements OnInit {
  lists: List[] | undefined;
  tasks: Task[] | undefined;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      // console.log(params);
      this.taskService.getTasks(params['listId'])?.subscribe(
        (tasks: any) => {
          this.tasks = tasks;
        },
        (error) => {
          console.log('Error fetching tasks:', error);
        }
      );
    });

    this.taskService.getLists().subscribe(
      (lists: any) => {
        this.lists = lists;
      },
      (error) => {
        console.log('Error fetching lists:', error);
      }
    );
  }

  onTaskClick(task: Task) {
    this.taskService.completed(task).subscribe(() => {
      console.log('Completed Successfully!');
      task.completed = !task.completed;
    });
  }
}
