import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, ".env") });

import express, { Express, Request, Response } from "express";
import connectDB from "./db/mongoose";
import bodyParser from "body-parser";
import { list, task } from "./db/models";

const app: Express = express();
const port = process.env.PORT || 5000;

//---Middle wares
app.use(bodyParser.json());

// Cors Headers MiddleWare.
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Root Handlers

// ----------------: List Routes
/***
 * GET /lists
 * Purpose: Get all lists
 */
app.get("/lists", (req: Request, res: Response) => {
  list
    .find({})
    .then((lists) => {
      res.status(200).json(lists);
    })
    .catch((error) => {
      console.error("Error retrieving lists", error);
      res.status(500).send("Internal Server Error");
    });
});
/***
 * POST /lists
 * Purpose: Create a list
 */
app.post("/lists", (req: Request, res: Response) => {
  let title = req.body.title;
  let newList = new list({
    title,
  });
  newList
    .save()
    .then((listDoc) => {
      res.status(200).json(listDoc);
    })
    .catch((error) => {
      console.error("Error Creating lists", error);
      res.status(500).send("Internal Server Error!");
    });
});
/***
 * PATCH /lists/:id
 * Purpose: update a list
 */
app.patch("/lists/:id", (req: Request, res: Response) => {
  list
    .findOneAndUpdate({ _id: req.params.id }, { $set: req.body })
    .then((updateTask) => {
      if (!updateTask) {
        return res.status(404).send("Task not Found");
      }
      res.status(200).json(updateTask);
    })
    .catch((error) => {
      console.error("Error", error);
      res.status(500).send("Internal Server Error.");
    });
});
/***
 * DELETE /lists/:id
 * Purpose: delete a list
 */

app.delete("/lists/:id", (req: Request, res: Response) => {
  list
    .findOneAndRemove({
      _id: req.params.id,
    })
    .then((removedListDoc) => {
      res.send(removedListDoc);
    })
    .catch((error) => {
      console.error("Error", error);
      res.status(500).send("Internal Server Error.");
    });
});

// --------------: Task Routes
/***
 * GET /lists/:listId/tasks
 * Purpose: all tasks for a specific list
 */

app.get("/lists/:listId/tasks", (req: Request, res: Response) => {
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

app.get("/lists/:listId/tasks/:id", (req: Request, res: Response) => {
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

app.post("/lists/:listId/tasks", (req: Request, res: Response) => {
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
app.patch("/lists/:listId/tasks/:id", (req: Request, res: Response) => {
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

app.delete("/lists/:listId/tasks/:id", (req: Request, res: Response) => {
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

//
//
//..........##############.............
//..........##############.............
//..........##############.............

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`[Server]: I am running at http://localhost:${port}`);
  });
});
