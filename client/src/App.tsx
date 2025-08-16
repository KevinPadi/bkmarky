import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";

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
              <h1>Bookmarks</h1>
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
