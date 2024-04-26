import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { checkCookieSession } from "../services/auth";
import { sessionState } from "../features/auth/authSlice";
import { toast } from "sonner";
import { PuffLoader } from "react-spinners";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [session, setActive] = useState(true);
  const [loading, setLoading] = useState(true);
  const activeSession = useSelector((state) => state.auth.sessionState);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const verifySession = async () => {
      try {
        const res = await checkCookieSession();
        console.log("cookie session : ", res.customStatus);
        if (
          res.customStatus === "noSession" ||
          res.customStatus === "sessionExpired"
        ) {
          setActive(false);
          dispatch(sessionState(false));
          if (
            localStorage.getItem("wasLoggedIn") &&
            !sessionStorage.getItem("Logout")
          ) {
            toast.warning("Your session has expired. Please log in again!");
            localStorage.removeItem("wasLoggedIn");
            sessionStorage.removeItem("Logout");
            navigate("/login");
          } else {
            localStorage.removeItem("wasLoggedIn");
            sessionStorage.removeItem("Logout");
            navigate("/login");
          }
        }
        if (res.customStatus == "sessionActive") {
          dispatch(sessionState(true));
          localStorage.setItem("wasLoggedIn", true);
          navigate("/home");
        }
      } catch (error) {
        console.error("Session check failed:", error);
      } finally {
        setLoading(false);
      }
    };
    verifySession();
  }, [dispatch, navigate, session, activeSession]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <PuffLoader color="#3e7bee" />
      </div>
    );
  }

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};
