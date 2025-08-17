import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import Bookmarks from "./pages/Bookmarks";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route
        path="bookmarks"
        element={
          <>
            <SignedIn>
              <Bookmarks />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        }
      />
    </Routes>
  );
}

export default App;
