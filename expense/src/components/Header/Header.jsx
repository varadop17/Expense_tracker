import "./Header.css";
import { auth } from "../../firebase"; // Use your initialized Firebase instance
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth"; // We already have `auth` from your firebase file

function Header() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate(); 

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]); 

  const LogoutFnc = () => {
    try {
      signOut(auth).then(() => {
        // Sign-out successful.
        navigate("/");
        toast.success("Logged Out Successfully");
      }).catch((error) => {
        toast.error(error.message);
      });
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <>
      <div className="navbar">
        <p className="logo">ExpenseMate</p>
        {user && (
          <p className="logo link" onClick={LogoutFnc}>
            Logout
          </p>
        )}
      </div>
    </>
  );
}

export default Header;
