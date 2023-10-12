import { Injectable } from '@angular/core';
import { WebRequestService } from './web.request.service';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private webRequestService: WebRequestService) {}

  getLists() {
    return this.webRequestService.get('lists');
  }

  createList(title: string) {
    return this.webRequestService.post('lists', { title });
  }

  getTasks(listId: string) {
    return this.webRequestService.get(`lists/${listId}/tasks`);
  }

  createTask(title: string, listId: string | undefined) {
    return this.webRequestService.post(`lists/${listId}/tasks`, { title });
  }

  completed(task: Task) {
    return this.webRequestService.patch(
      `lists/${task._listId}/tasks/${task._id}`,
      { completed: !task.completed }
    );
  }
}
