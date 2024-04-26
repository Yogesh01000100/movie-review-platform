import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import auth from "../../config/firebase-config";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendEmailVerification,
} from "firebase/auth";
import { ClockLoader, BarLoader } from "react-spinners";
import { toast } from "sonner";
import logo from "../../assets/google.svg";
import { createSession } from "../../services/auth";

function Auth() {
  const [authState, setAuthState] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState({ active: false, type: "" });
  const toggleAuthState = () => setAuthState(!authState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAuthAction = async (e) => {
    e.preventDefault();
    if (authState) await handleSignUp();
    else await handleSignIn();
  };
  const handleSignIn = async () => {
    try {
      setLoading({ active: true, type: "email" });
      const result = await signInWithEmailAndPassword(auth, email, password);
      if (result.user.emailVerified) {
        dispatch(
          login({
            uid: result.user.uid,
            email: result.user.email,
            displayName: result.user.displayName,
            photoURL: result.user.photoURL,
          })
        );
        setLoading({ active: false, type: "" });
        const { idToken } = result._tokenResponse;
        const sessionCreated = await createSession(idToken);
        if (!sessionCreated) {
          toast.error("Something went wrong! Please try again");
        }
      } else {
        toast.warning("Please verify your email before signing in");
      }
    } catch (error) {
      console.error("Error signing in with email and password:", error);
      toast.error("Something went wrong! Please try again");
    } finally {
      setLoading({ active: false, type: "" });
    }
  };

  const handleSignUp = async () => {
    const signUpPromise = createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        return sendEmailVerification(userCredential.user);
      })
      .then(() => {
        setAuthState(false);
        setEmail("");
        setPassword("");
        toast.info("Check your email to verify your account.");
      })
      .catch((error) => {
        console.error(error);
      });

    toast.promise(
      signUpPromise,
      {
        loading: "Sending verification email...",
        error: "Error while signing up. Please try again.",
      },
      {
        style: {
          minWidth: "200px",
        },
        success: {
          duration: 6500,
        },
      }
    );
  };

  const handleSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    setLoading({ active: true, type: "google" });
    try {
      const result = await signInWithPopup(auth, provider);
      if (result.user.emailVerified) {
        dispatch(
          login({
            uid: result.user.uid,
            email: result.user.email,
            displayName: result.user.displayName,
            photoURL: result.user.photoURL,
          })
        );
        const { idToken } = result._tokenResponse;
        const sessionCreated = await createSession(idToken);
        if (sessionCreated) {
          navigate("/home");
        } else {
          console.error("Failed to create session!");
          // Potential logout or reattempt session creation
          return;
        }
      } else {
        toast.warning("Something went wrong! Please try again.");
      }
    } catch (error) {
      console.error("Error signing in with Google:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading({ active: false, type: "" });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="bg-white bg-opacity-50 rounded-xl shadow-md p-6 w-full h-1/2 max-w-md mx-auto backdrop-blur-md">
        <div className="text-center">
          <h2 className="text-slate-800 text-3xl font-bold mt-5 mb-6">
            {authState ? "Create an account" : "Welcome back"}
          </h2>
          <form onSubmit={handleAuthAction} className="space-y-7">
            <div className="flex flex-col items-center my-1">
              <input
                id="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="block w-3/5 px-4 py-2 my-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="block w-3/5 px-4 py-2 my-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-3/5 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              <div className="flex justify-center items-center">
                <div>
                  {loading.active && loading.type === "email" ? (
                    <ClockLoader color="#FFFFFF" size={15} />
                  ) : (
                    "Continue"
                  )}
                </div>
              </div>
            </button>
            <p
              className="text-gray-600 cursor-pointer text-sm"
              onClick={() => {
                toggleAuthState();
                setEmail("");
                setPassword("");
              }}
            >
              {authState ? (
                <>
                  Already have an account?{" "}
                  <span className="text-blue-500 hover:text-blue-600">
                    Sign In
                  </span>
                </>
              ) : (
                <>
                  Don&apos;t have an account?{" "}
                  <span className="text-blue-500 hover:text-blue-600">
                    Sign Up
                  </span>
                </>
              )}
            </p>

            <div className="relative">
              <div className="absolute inset-0 flex justify-center items-center">
                <div className="w-3/5 border-t border-gray-300"></div>{" "}
              </div>
              <div className="relative flex justify-center mt-2">
                <span className="bg-gray-100 px-3 text-sm text-gray-500">
                  OR
                </span>
              </div>
            </div>
            <button
              type="button"
              className="w-3/5 bg-white text-black py-2 rounded border-blue-500 hover:bg-slate-100 border mt-4"
              onClick={handleSignInWithGoogle}
            >
              <div className="flex flex-row justify-center items-center">
                <div className="mr-2">
                  <img
                    src={logo}
                    alt="Google logo"
                    style={{ width: "22px", height: "22px" }}
                  />
                </div>
                <div>
                  {loading.active && loading.type === "google" ? (
                    <BarLoader color="#3c82f6" height={3} width={75} />
                  ) : (
                    "Continue with Google"
                  )}
                </div>
              </div>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Auth;
