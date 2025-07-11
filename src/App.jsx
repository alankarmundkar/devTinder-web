import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Body from "./components/Body";
import { appStore } from "./utils/appStore";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Signup from "./components/Signup";

function App() {
  return (
    <>
      <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body/>}>
            <Route path="/" element={<Feed/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/connections" element={<Connections/>}/>
            <Route path="/requests" element={<Requests/>}/>
            <Route path="/signup" element={<Signup/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
