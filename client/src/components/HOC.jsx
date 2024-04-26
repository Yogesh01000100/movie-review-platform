import Navbar from "./NavBar";

const withAuth = (Component) => {
  return function WComponent(props) {
    return (
      <>
        <Navbar />
        <Component {...props} />
      </>
    );
  };
};

export default withAuth;
