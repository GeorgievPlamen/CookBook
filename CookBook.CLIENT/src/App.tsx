import { RouterProvider } from "react-router-dom";
import { router } from "./layout/Routes";

export default function App() {
  return <RouterProvider router={router}></RouterProvider>;
}
