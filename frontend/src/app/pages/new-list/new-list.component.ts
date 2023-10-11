import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { List } from 'src/app/models/list.model';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss'],
})
export class NewListComponent {
  constructor(private taskService: TaskService, private router: Router) {}

  createList(title: string) {
    this.taskService.createList(title).subscribe((res: any) => {
      const list: List = res;
      console.log(list);
      // navigate to /lists/response._id
      this.router.navigate(['/lists', list._id]);
    });
  }
}
