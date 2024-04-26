import { toast } from "sonner";
export const handleSessionTimeout = (storeAPI) => (next) => (action) => {
  if (action.type === "API_CALL_FAILURE" && action.payload.status === 401) {
    storeAPI.dispatch({ type: "auth/logout" });
    toast.warning("Your session has expired. Please log in again!");
  }
  return next(action);
};