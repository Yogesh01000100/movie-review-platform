import auth from "../config/firebase-config";
import { logout } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { sessionLogout } from "../services/auth";

const Navbar = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const response = await sessionLogout();
    if (response.status === 200) {
      dispatch(logout());
      sessionStorage.setItem("Logout", true);
      await auth.signOut();
    }
  };
  return (
    <div className="bg-gray-800 p-5 text-white">
      <nav className="flex flex-row justify-around">
        <div>
          <h1>LOGO</h1>
        </div>
        <div>
          <ul className="flex flex-row justify-around">
            <li className="mx-4">reviews</li>
            <li className="mx-4">Home</li>
            <li className="mx-4">NFTs</li>
            <li className="mx-4">Recents</li>
          </ul>
        </div>
        <div>
          <button
            onClick={handleLogout}
            className="bg-blue-500 text-white font-semibold py-1 px-5 rounded hover:bg-blue-700"
          >
            Log out
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
