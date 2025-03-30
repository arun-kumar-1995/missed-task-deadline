export const useAuth = () => {
  const user = localStorage.getItem("user");
  if (!user) return { isAuthenticated: false, userId: null };
  const userObj = JSON.parse(user);
  return { isAuthenticated: true, userId: userObj.userId };
};
