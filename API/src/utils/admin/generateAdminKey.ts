export const generateAdminKey = (adminId: string, newAdminId: string) => {
  return `${adminId}.${newAdminId}.${Date.now().toString()}`;
}