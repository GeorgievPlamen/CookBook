import { createContext, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";

interface JwtContextProps {
  jwt: string | null;
  setJwt: React.Dispatch<React.SetStateAction<string>> | null;
}

export const JwtContext = createContext<JwtContextProps>({
  jwt: null,
  setJwt: null,
});

export default function Layout() {
  const [jwt, setJwt] = useState("");

  return (
    <div className="flex min-h-screen flex-col">
      <JwtContext.Provider value={{ jwt, setJwt }}>
        <Header />
        <Main />
        <Footer />
      </JwtContext.Provider>
    </div>
  );
}
