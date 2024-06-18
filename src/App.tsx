import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { Register } from "./Auth/Register";
import { Login } from "./Auth/Login";
import { Users } from "./Users/Users";
import { User } from "./User/User";
import { Header } from "./Header/Header";
import { UserProvider } from "./UserContext";

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <Router>
            <Main />
          </Router>
        </UserProvider>
      </QueryClientProvider>
    </Provider>
  );
}

function Main() {
  const location = useLocation();
  const token = localStorage.getItem("token");

  return (
    <>
      {(location.pathname === "/users" ||
        location.pathname.startsWith("/users/")) && <Header />}
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/users"
          element={token ? <Users /> : <Navigate to="/" />}
        />
        <Route
          path="/users/:id"
          element={token ? <User /> : <Navigate to="/" />}
        />
      </Routes>
    </>
  );
}

export default App;
