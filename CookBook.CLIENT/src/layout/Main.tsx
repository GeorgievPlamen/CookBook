import { Outlet } from "react-router-dom";

export default function Main() {
  return (
    <main className="mx-auto my-4 h-full flex-grow">
      <Outlet />
    </main>
  );
}
