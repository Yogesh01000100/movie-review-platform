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
import { useState } from "react";

function Login() {
  const [authState, setAuthState] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.user !== null);

  const toggleAuthState = () => setAuthState(!authState);

  const handleAuthAction = async (e) => {
    e.preventDefault();
    if (authState) await handleSignUp();
    else await handleSignIn();
  };

  const handleSignIn = async () => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      dispatch(
        login({
          uid: result.user.uid,
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
        })
      );
    } catch (error) {
      console.error("Error signing in with email and password:", error);
    }
  };

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await sendEmailVerification(userCredential.user);
    } catch (error) {
      console.error("Error signing up:", error);
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
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h1>Welcome Back!</h1>
          <button
            onClick={() => {
              localStorage.removeItem("_axxess_Token_");
              dispatch(logout());
            }}
            className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700"
          >
            Log out
          </button>
        </div>
      ) : (
        <form onSubmit={handleAuthAction}>
          <label htmlFor="Email">
            Email:
            <input
              id="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />
          </label>
          <br />
          <label htmlFor="password">
            Password:
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </label>
          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
            >
              {authState ? "Sign Up" : "Sign In"}
            </button>
            <button
              type="button"
              className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700"
              onClick={handleSignInWithGoogle}
            >
              Continue with Google
            </button>
            <p
              className="text-center text-gray-600 cursor-pointer"
              onClick={toggleAuthState}
            >
              {authState
                ? "Already have an account? Sign In"
                : "Need an account? Sign Up"}
            </p>
          </div>
        </form>
      )}
    </div>
  );
}

export default Login;
