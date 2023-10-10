import { Component } from '@angular/core';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss'],
})
export class NewListComponent {
  constructor(private taskService: TaskService) {}

  createList(title: string) {
    this.taskService.createList(title).subscribe((res: any) => {
      console.log(res);
      // navigate to /lists/response._id
    });
  }
}
