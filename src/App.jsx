import Body from "./components/Body";
import { createBrowserRouter, useNavigate } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import store from "./utilities/appSlice";
import { Provider } from "react-redux";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import Protected from "./components/Protected";
import { useEffect, useState } from "react";
function App() {
  const [user, setuser] = useState(null);
  const auth = getAuth();
  useEffect(() => {
    const unsubs = onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        setuser(user);
        return;
      }
    });
  }, []);
  const appRouter = createBrowserRouter([
    { path: "/", element: <SignupForm /> },
    { path: "/SignupForm", element: <SignupForm /> },
    { path: "/LoginForm", element: <LoginForm /> },
    {
      path: "/protected",
      element: (
        <Protected user={user}>
          <Body />
        </Protected>
      ),
    },
  ]);
  return (
    <Provider store={store}>
      <RouterProvider router={appRouter} />
    </Provider>
  );
}

export default App;
