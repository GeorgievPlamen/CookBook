import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { api } from "../../api/CookBookApi";
import { AxiosError } from "axios";
import { JwtContext } from "../../layout/Layout";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const nav = useNavigate();
  const { setJwt } = useContext(JwtContext);

  async function onSubmit(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    try {
      const response = await api.authentication.login(email, password);

      if (response.token) {
        sessionStorage.setItem("jwt", response.token);
        setError("");
        setJwt!(response.token);
        nav("/");
      } else setError("Could not get token.");
    } catch (error) {
      const axiosError = error as AxiosError;
      setError(axiosError.message);
    }
  }

  return (
    <form className="h-fit w-fit rounded-lg border px-4 py-2 shadow-md shadow-slate-500">
      <h2 className="mb-2 text-center text-2xl font-bold">Sign in</h2>
      <div className="mb-2 flex flex-col">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-2 flex flex-col">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        className="bg-background mb-1 w-full rounded-lg py-1 text-white"
        type="submit"
        onClick={onSubmit}
      >
        Login
      </button>
      <div className="flex items-center justify-end">
        <NavLink
          to={"/signup"}
          className="text-end text-xs font-light underline"
        >
          No account? Register
        </NavLink>
      </div>
      {error.length > 0 ? <p className="text-red-600">{error}</p> : null}
    </form>
  );
}
