import { Router, Request, Response } from "express";
import { task } from "../db/models";
const router = Router();

/***
 * GET /lists/:listId/tasks
 * Purpose: all tasks for a specific list
 */
router.get("/lists/:listId/tasks", (req: Request, res: Response) => {
  task
    .find({
      _listId: req.params.listId,
    })
    .then((tasks) => {
      res.status(200).json(tasks);
    })
    .catch((error) => {
      console.error("Error retrieving tasks:", error);
      res.status(500).send("Internal server Error");
    });
});

/***
 * GET /lists/:listId/tasks/:id
 * Purpose: get a specific task
 */

router.get("/lists/:listId/tasks/:id", (req: Request, res: Response) => {
  task
    .findOne({
      _id: req.params.id,
      _listId: req.params.listId,
    })
    .then((task) => {
      res.status(200).json(task);
    })
    .catch((error) => {
      console.error("Error retrieving task", error);
      res.status(500).send("Internal server Error!");
    });
});

/***
 * POST /lists/:listId/tasks
 * Purpose: Create a new task in a specific list
 */

router.post("/lists/:listId/tasks", (req: Request, res: Response) => {
  let newTask = new task({
    title: req.body.title,
    _listId: req.params.listId,
  });
  newTask
    .save()
    .then((newTaskDoc) => {
      res.status(201).json(newTaskDoc);
    })
    .catch((error) => {
      console.error("Error creating task", error);
      res.status(500).send("Internal Server Error!");
    });
});

/***
 * PATCH /lists/:listId/tasks/:taskid
 * Purpose: Update an existing task
 */
router.patch("/lists/:listId/tasks/:id", (req: Request, res: Response) => {
  task
    .findOneAndUpdate(
      {
        _id: req.params.id,
        _listId: req.params.listId,
      },
      {
        $set: req.body,
      },
      { new: true }
    )
    .then((updateTask) => {
      if (!updateTask) {
        return res.status(404).send("Task not Found");
      }
      res.status(200).json(updateTask);
    })
    .catch((error) => {
      console.error("Error updating task:", error);
      res.status(500).send("Internal Server Error");
    });
});

/***
 * DELETE /lists/:listId/tasks/:id
 * Purpose: Delete a task
 */

router.delete("/lists/:listId/tasks/:id", (req: Request, res: Response) => {
  task
    .findOneAndRemove({
      _id: req.params.id,
      _listId: req.params.listId,
    })
    .then((removedTask) => {
      if (!removedTask) {
        // Task not found
        return res.status(404).json({ message: "Task not found" });
      }
      res
        .status(200)
        .json({ message: "Task deleted successfully", removedTask });
    })
    .catch((error) => {
      console.error("Error deleting task:", error);
      res.status(500).send("Internal Server Error.");
    });
});

export default router;
