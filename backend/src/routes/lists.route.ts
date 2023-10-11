import { Router, Request, Response } from "express";
import { list } from "../db/models";
const router = Router();

/***
 * GET /lists
 * Purpose: Get all lists
 */
router.get("/lists", (req: Request, res: Response) => {
  list
    .find({})
    .then((lists: any) => {
      res.status(200).json(lists);
    })
    .catch((error: any) => {
      console.error("Error-retrieving lists", error);
      res.status(500).send("Internal Server Error.");
    });
});

/***
 * POST /lists
 * Purpose: Create a list
 */
router.post("/lists", (req: Request, res: Response) => {
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
router.patch("/lists/:id", (req: Request, res: Response) => {
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

router.delete("/lists/:id", (req: Request, res: Response) => {
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

export default router;
