import { useSelector, useDispatch } from "react-redux";
import {
  login,
  logout,
  setEmail,
  setPassword,
} from "../../features/auth/authSlice";

function Login() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.user);
  const email = useSelector((state) => state.auth.email);
  const password = useSelector((state) => state.auth.password);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  const handleSignUp = () => {}; // to be implemented

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="Email">
          Email:
          <input
            id="Email"
            type="email"
            value={email}
            placeholder="Enter email"
            onChange={(e) => {
              dispatch(setEmail(e.target.value));
            }}
          ></input>
        </label>

        <br />
        <label htmlFor="password">
          Password:
          <input
            id="password"
            type="password"
            value={password}
            placeholder="Enter password"
            onChange={(e) => {
              dispatch(setPassword(e.target.value));
            }}
          ></input>
        </label>
        <div>
          {isLoggedIn ? (
            ""
          ) : (
            <div>
              <button type="submit">Log In</button>
              <br />
              <button type="button" onClick={handleSignUp}>
                SignUp
              </button>
            </div>
          )}
        </div>
      </form>

      <div>
        {isLoggedIn ? (
          <div>
            <h1> hELLO</h1>
            <button
              type="button"
              onClick={() => {
                dispatch(logout());
              }}
            >
              Log out
            </button>
          </div>
        ) : (
          " "
        )}
      </div>
    </div>
  );
}

export default Login;
