import {
  addCollaboratorService,
  getAllCollaboratorsService,
  getCollaboratorRoleService,
  removeCollaboratorService,
} from "../models/collaboratorModel.js";

// Standard response
const handleResponse = (res, _status, message, data = null) => {
  res.status(_status).json({
    _status,
    message,
    data,
  });
};

// Add collaborator
export const addCollaborator = async (req, res) => {
  const { playlistId } = req.params;
  const { userId, role = "editor" } = req.body;

  try {
    const newCollaborator = await addCollaboratorService(
      playlistId,
      userId,
      role
    );
    handleResponse(res, 201, "Collaborator added", newCollaborator);
  } catch (err) {
    console.error(err);
    handleResponse(res, 500, "Failed to add collaborator");
  }
};

// Remove collaborator
export const removeCollaborator = async (req, res) => {
  const { playlistId, userId } = req.params;
  try {
    const deletedCollaborator = removeCollaboratorService(playlistId, userId);
    res.json({ message: "Collaborator removed" });
    if (!deletedCollaborator)
      return handleResponse(res, 404, "Collaborator not found");
    handleResponse(res, 200, "Playlist deleted successfully", deletedPlaylist);
  } catch (err) {
    console.error(err);
    handleResponse(res, 500, "Failed to remove collaborator");
  }
};

// Get all collaborators
export const getAllCollaborators = async (req, res) => {
  const { playlistId } = req.params;
  try {
    const result = getAllCollaboratorsService(playlistId);
    handleResponse(res, 200, "Collaborators fetched", result.rows);
  } catch (err) {
    console.error(err);
    handleResponse(res, 500, "Failed to fetch collaborators");
  }
};

// Get current user's role
export const getCollaboratorRole = async (req, res) => {
  const { playlistId } = req.params;
  const userId = req.user.id;
  try {
    const result = await getCollaboratorRoleService(playlistId, userId);
    if (result.rowCount === 0) {
      return handleResponse(res, 403, "Not a collaborator");
    }
    handleResponse(res, 200, "collaborator role found", {
      role: result.rows[0].role,
    });
  } catch (err) {
    console.error(err);
    handleResponse(res, 500, "Failed to fetch role");
  }
};
