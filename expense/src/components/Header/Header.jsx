import "./Header.css";
import { auth } from "../../firebase"; 
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth"; 
import userSvg from "../../assets/user.svg";

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
          <div style={{display:"flex",alignItems:"center",gap:"0.5rem"}}>
            <img
              src={user.photoURL ? user.photoURL : userSvg}
              width={user.photoURL ? "40" : "32"}
              style={{ borderRadius: "50%" }}
            />
            <p className="logo link" onClick={LogoutFnc}>
            Logout
          </p>
           </div>
          
        )}
      </div>
    </>
  );
}

export default Header;
