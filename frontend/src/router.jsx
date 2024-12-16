import { createBrowserRouter } from "react-router-dom";
import Root from "./layout/Root";
import Welcome from "./Pages/Welcome";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import Listing from "./Pages/Listing";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            { path: "/", element: <Welcome /> },
            { path: "/home", element: <Home /> },
            { path: "/profile", element: <Profile /> },
            { path: "/listings/:id", element: <Listing />},
        ],
    },
]);

export default router;