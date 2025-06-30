import express from "express";

// auth middleware
import authMiddleware from "../middleware/authMiddleware.js";
import {
  addCollaborator,
  getAllCollaborators,
  getCollaboratorRole,
  removeCollaborator,
} from "../controllers/collaboratorController.js";

import { requireCollaboratorRole } from "../utils/roles.js";

const router = express.Router();

router.use(authMiddleware);

// add a collaborator route
router.post("/", requireCollaboratorRole("owner"), addCollaborator);

// remove a collaborator route
router.delete("/:userId", requireCollaboratorRole("owner"), removeCollaborator);

// list collaborators route
router.get("/", requireCollaboratorRole("viewer"), getAllCollaborators);

// get a user's role on playlist
router.delete("/:userId", getCollaboratorRole);

export default router;
