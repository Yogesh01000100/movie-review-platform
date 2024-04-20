import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../../features/auth/authSlice";
import auth from "../../config/firebase-config";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendEmailVerification,
} from "firebase/auth";
import GoogleIcon from "@mui/icons-material/Google";
import ClockLoader from "react-spinners/ClockLoader";
import { toast, Toaster } from "sonner";

function Login() {
  const [authState, setAuthState] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.user !== null);
  const [loading, setLoader] = useState(false);

  const toggleAuthState = () => setAuthState(!authState);

  const handleAuthAction = async (e) => {
    e.preventDefault();
    if (authState) await handleSignUp();
    else await handleSignIn();
  };

  const handleSignIn = async () => {
    try {
      setLoader(true);
      const result = await signInWithEmailAndPassword(auth, email, password);
      dispatch(
        login({
          uid: result.user.uid,
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
        })
      );
      setLoader(false);
      toast.success("Logged in successfully!");
    } catch (error) {
      console.error("Error signing in with email and password:", error);
      toast.error("Something went wrong!");
      setLoader(false);
    }
  };

  const handleSignUp = async () => {
    try {
      setLoader(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await sendEmailVerification(userCredential.user);
      setLoader(false);
      setAuthState(false);
      setEmail("");
      setPassword("");
      toast.info(
        "Please check your inbox to complete your email verification!"
      );
    } catch (error) {
      console.error("Error signing up:", error);
      toast.error("Something went wrong!");
      setLoader(false);
    }
  };

  const handleSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      dispatch(
        login({
          uid: result.user.uid,
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
        })
      );
      const { accessToken } = result.user.stsTokenManager;
      localStorage.setItem("_axxess_Token_", accessToken);
      toast.success("Logged in successfully!");
    } catch (error) {
      console.error("Error signing in with Google:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div>
        <Toaster
          richColors
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
      <div className="bg-white bg-opacity-50 rounded-xl shadow-md p-6 w-full h-1/2 max-w-md mx-auto backdrop-blur-md">
        {isLoggedIn ? (
          <div className="text-center">
            Welcome Back
            <button
              onClick={() => {
                localStorage.removeItem("_axxess_Token_");
                dispatch(logout());
                setEmail("");
                setPassword("");
                toast.info("Logged out successfully!");
              }}
              className="w-full bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700 mt-4"
            >
              Log out
            </button>
          </div>
        ) : (
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
                  className="block w-3/5 px-4 py-2 my-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="block w-3/5 px-4 py-2 my-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-3/5 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              >
                <div className="flex justify-center items-center">
                  <div>
                    {loading ? (
                      <ClockLoader color="#FFFFFF" size={22} />
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
                className="w-3/5 bg-white text-black py-2 rounded border-blue-500 hover:bg-slate-200 border mt-4"
                onClick={handleSignInWithGoogle}
              >
                <GoogleIcon className="mr-2 mb-1" style={{ color: '#4285F4' }}/>
                Continue with Google
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
