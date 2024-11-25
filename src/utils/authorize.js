// Note: we don't want to take the risk to show something when we shouldn't.
// Any missing information should result in a false return to avoid leaking UI elements.

export const authorize = ({ user, requiredPermission } = {}) => {
  if (!user || !user.permissions || !requiredPermission) {
    return false
  }

  const userHasRequiredPermission = !!user.permissions
    .find((permission) => permission === requiredPermission)

  return userHasRequiredPermission
}
