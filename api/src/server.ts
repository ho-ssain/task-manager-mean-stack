import express, { Express, Request, Response } from "express";

const app: Express = express();
const port = 3000;

// Root Handlers

// List Routes

/***
 * GET /lists
 * Purpose: Get all lists
 */ app.get("/lists", (req: Request, res: Response) => {
  // we want to return an array of all the lists in the database.
});

/***
 * POST /lists
 * Purpose: Create a list
 */ app.post("/lists", (req: Request, res: Response) => {
  // we want to create a new list and return the new list document back to the user (which includes the id)
  // the list information (fields) will be passed in via the JSON request body
});

/***
 * PATCH /lists/:id
 * Purpose: update a list
 */ app.patch("/lists/:id", (req: Request, res: Response) => {});

/***
 * DELETE /lists/:id
 * Purpose: delete a list
 */ app.delete("/lists/:id", (req: Request, res: Response) => {});

app.listen(port, () => {
  console.log(`[Server]: I am running at http://localhost:${port}`);
});
