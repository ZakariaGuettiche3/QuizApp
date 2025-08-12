import Navebare from "./Navebare";
import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

export default function Home() {
  const jwt = Cookies.get("jwt");

  return (
    <>
      {jwt ? (
        <>
          {" "}
          <>
            <Navebare />
            <div className="container">
              <Outlet />
            </div>
          </>
        </>
      ) : (
        <Navigate to="/Sign-in_Sign_up"></Navigate>
      )}
    </>
  );
}
