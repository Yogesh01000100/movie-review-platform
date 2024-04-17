import { useState } from "react";

function Login() {
  const [user, setUser] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if(email=='email@email.com' && password==1){
      setUser(true);
    }
    else{
      alert("Error!");
    }
  };

  const handleSignUp = () => {};

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
              setEmail(e.target.value);
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
              setPassword(e.target.value);
            }}
          ></input>
        </label>
        <div>
          {user ? (
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
        {user ? (
          <div>
            <h1> hELLO</h1>
            <button
              type="button"
              onClick={() => {
                setUser(false);
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
