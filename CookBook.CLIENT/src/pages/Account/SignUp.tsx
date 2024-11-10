import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { api } from "../../api/CookBookApi";
import { AxiosError } from "axios";
import { AppContext } from "../../layout/Layout";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { setJwt } = useContext(AppContext);
  const nav = useNavigate();

  async function onSubmit(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    try {
      const response = await api.authentication.register(name, email, password);

      if (response.token) {
        sessionStorage.setItem("jwt", response.token);
        setError("");
        setJwt!(response.token);
        nav("/");
      } else setError("Could not get token.");
    } catch (error) {
      const axiosError = error as AxiosError;
      setError(`${axiosError.message} ${axiosError.response?.statusText}`);
    }
  }

  return (
    <form className="h-fit w-fit rounded-lg border px-4 py-2 shadow-md shadow-slate-500">
      <h2 className="mb-2 text-center text-2xl font-bold">Sign up</h2>
      <div className="mb-2 flex flex-col">
        <label htmlFor="name">Name</label>
        <input
          className="rounded-lg border-2"
          type="text"
          name="name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-2 flex flex-col">
        <label htmlFor="email">Email</label>
        <input
          className="rounded-lg border-2"
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-2 flex flex-col">
        <label htmlFor="password">Password</label>
        <input
          className="rounded-lg border-2"
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="mb-2 flex flex-col">
        <label htmlFor="confirmPassword">Confirm</label>
        <input
          className="rounded-lg border-2"
          type="password"
          name="confirmPassword"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <button
        className="mb-1 w-full rounded-lg bg-background py-1 text-white"
        type="submit"
        onClick={onSubmit}
      >
        Register
      </button>
      <div className="flex items-center justify-end">
        <NavLink
          to={"/signin"}
          className="text-end text-xs font-light underline"
        >
          Already registered? Login
        </NavLink>
      </div>
      {error.length > 0 ? <p className="text-red-600">{error}</p> : null}
    </form>
  );
}
