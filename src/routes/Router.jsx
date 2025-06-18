import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
// import Home from "../components/Home";
import Login from "../components/Login";
import Register from "../components/Register";
// import ShareTip from "../components/ShareTip";
// import ErrorPage from "../components/ErrorPage";
// import BrowseTipsPage from "../components/BrowseTipsPage";
// import PrivateRoute from "./PrivateRoute";
// import TipDetails from "../components/TipDetails";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: MainLayout,
        children: [
            // {
            //     path: '/',
            //     Component: Home,
            // },
            {
                path: '/login',
                Component: Login,
            },
            {
                path: '/register',
                Component: Register,
            },
            // {
            //     path: '/share-tip',
            //     Component: ShareTip,
            // },
            // {
            //     path: '/tips/:id',
            //     Component: TipDetails,
            // },
        ]
    },
//     {
//         path: '*',
//         Component: ErrorPage,
//     },
//     {
//         path: 'browse-tips',
//         element: <PrivateRoute>
//                     <BrowseTipsPage></BrowseTipsPage>
                    
//                 </PrivateRoute>
//     },
//     {
//         path: 'tips/:id',
//         element: <PrivateRoute>
//                     <TipDetails></TipDetails>
//                 </PrivateRoute>
//     },
//     {
//         path: 'share-tip',
//         element: <PrivateRoute>
//                     <ShareTip></ShareTip>
//                 </PrivateRoute>
//     },
    
// 
]
)