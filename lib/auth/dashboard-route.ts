export function getDashboardByRole(role?: string) {
  switch (role) {
    case "SUPER_ADMIN":
      return "/super-admin";
    case "ADMIN":
      return "/admin";
    case "MODERATOR":
      return "/moderator";
    default:
      return "/dashboard";
  }
}
