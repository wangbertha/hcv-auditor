import { createBrowserRouter } from "react-router-dom";
import Root from "./layout/Root/Root";
import Welcome from "./pages/Welcome";
import Listings from "./pages/Listings";
import Profile from "./pages/Profile";
import ListingById from "./pages/ListingById";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            { path: "/", element: <Welcome /> },
            { path: "/profile", element: <Profile /> },
            { path: "/listings", element: <Listings /> },
            { path: "/listings/:id", element: <ListingById />},
        ],
    },
]);

export default router;