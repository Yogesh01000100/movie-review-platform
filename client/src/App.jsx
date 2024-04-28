import { BrowserRouter } from "react-router-dom";
import BaseRoute from "./routes";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "sonner";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <BaseRoute />
        <Toaster
          richColors
          position="top-center"
          newestOnTop={true}
          closeButton 
          headLess
          Toaster expand={true}
        />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
