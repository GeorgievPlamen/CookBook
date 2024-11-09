import { Outlet } from "react-router-dom";

export default function Main() {
  return (
    <main className="mx-auto my-4 flex h-full w-full flex-grow justify-center">
      <Outlet />
    </main>
  );
}
