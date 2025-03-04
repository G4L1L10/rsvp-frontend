import { AuthProvider } from "./context/AuthContext";
import RoutesComponent from "./router";
import GlobalStyles from "./styles/GlobalStyles";

function App() {
  return (
    <AuthProvider>
      <GlobalStyles />
      <RoutesComponent />
    </AuthProvider>
  );
}

export default App;
