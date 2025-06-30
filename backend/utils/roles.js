//  check collaborator role
const ROLE_HIERARCHY = {
  viewer: 1,
  editor: 2,
  owner: 3,
};

export const requireCollaboratorRole =
  (requiredRole) => async (req, res, next) => {
    const { playlistId } = req.params;
    const userId = req.user.id;

    const result = await requireCollaboratorRoleService(playlistId, userId);

    if (result.rowCount === 0)
      return handleResponse(res, 403, "Not a collaborator");

    const userRole = result.rows[0]?.role;
    const userLevel = ROLE_HIERARCHY[userRole] || 0;
    const requiredLevel = ROLE_HIERARCHY[requiredRole];

    if (userLevel < requiredLevel)
      return handleResponse(res, 403, "Insufficient permissions");

    req.collaboratorRole = result.rows[0].role;
    return next();
  };
