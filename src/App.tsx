import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import "./App.css";
import { Home } from "./Pages/Home";
import { SearchPage } from "./Pages/SearchPage";
import { WatchPage } from "./Pages/WatchPage";
import { Login } from "./Pages/Login";
import { Registration } from "./Pages/Registration";
import { Favorites } from "./Pages/Favorites";
import { HistoryPage } from "./Pages/History";
import { useAppDispatch } from "./store/hooks";
import { useEffect } from "react";
import { authCheckAction } from "./store/auth/actions/authActions";
import { AuthHoc } from "./components/authHoc/AuthHoc";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(authCheckAction());
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/watch/:id" element={<WatchPage />} />
        <Route
          path="/login"
          element={
            <AuthHoc forAuth={false}>
              <Login />
            </AuthHoc>
          }
        />
        <Route path="/registration" element={<Registration />} />
        <Route
          path="/favorites"
          element={
            <AuthHoc forAuth={true}>
              <Favorites />
            </AuthHoc>
          }
        />
        <Route
          path="/history"
          element={
            <AuthHoc forAuth={true}>
              <HistoryPage />
            </AuthHoc>
          }
        />
      </Routes>
    </BrowserRouter>
    /* <Home /> */
  );
}

export default App;
