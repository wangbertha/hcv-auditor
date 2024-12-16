import { createBrowserRouter } from "react-router-dom";
import Root from "./layout/Root";
import Welcome from "./Pages/Welcome";
import Listings from "./Pages/Listings";
import Profile from "./Pages/Profile";
import ListingById from "./Pages/ListingById";

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