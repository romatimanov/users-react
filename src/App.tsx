import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
            <Header />
            <Routes>
              <Route path="/" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/users" element={<Users />} />
              <Route path="/users/:id" element={<User />} />
            </Routes>
          </Router>
        </UserProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
