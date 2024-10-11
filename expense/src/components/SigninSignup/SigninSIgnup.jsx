import "./SigninSignup.css"; // Styles specific to this component
import Input from "../InputComp/Index"; // Input component for handling input fields
import { useState } from "react"; // React hooks for state management
import { useNavigate } from "react-router-dom"; // Navigation hook from React Router
import Button from "../Button"; // Custom Button component
import { toast } from "react-toastify"; // Notification library for toasts
import {
  createUserWithEmailAndPassword, // Function to create user with email/password
  signInWithEmailAndPassword, // Function to sign in user with email/password
  signInWithPopup, // Function to handle popup sign-in (e.g., Google Auth)
  GoogleAuthProvider // Provider for Google authentication
} from "firebase/auth"; // Firebase authentication functions
import { auth, db } from "../../firebase.js"; // Firebase initialization (auth and firestore)
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore"; // Firestore functions

function SigninSignup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState(false);
  const navigate = useNavigate();

  async function signupWithEmail(e) {
    e.preventDefault(); // Prevent form submission
    setLoading(true);
    if (name && email && password && confirmPassword) {
      if (password === confirmPassword) {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
          toast.success("User Created!");
          await createDoc(user);
          setName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          navigate("/dashboard");
        } catch (error) {
          toast.error("Signup error: " + error.message);
        } finally {
          setLoading(false);
        }
      } else {
        toast.error("Passwords do not match");
        setLoading(false);
      }
    } else {
      toast.error("All fields are mandatory");
      setLoading(false);
    }
  }

  async function loginWithEmail(e) {
    e.preventDefault(); // Prevent form submission
    setLoading(true);
    if (email && password) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        toast.success("Signed in successfully!");
        setEmail("");
        setPassword("");
        navigate("/dashboard");
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Email and password are required");
      setLoading(false);
    }
  }

  async function createDoc(user) {
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    try {
      const userData = await getDoc(userRef);
      if (!userData.exists()) {
        await setDoc(userRef, {
          name: user.displayName || name,
          email: user.email,
          photoURL: user.photoURL || "",
          createdAt: serverTimestamp(),
        });
        // toast.success("User document created!");
      } else {
        // toast.info("User document already exists");
      }
    } catch (e) {
      console.error("Error creating user document:", e);
      toast.error("Error creating user document: " + e.message);
    }
  }

  async function googleAuth(e) {
    e.preventDefault(); // Prevent form submission
    setLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(user);
      toast.success("User authenticated!");
      await createDoc(user);
      navigate("/dashboard");
    } catch (error) {
      toast.error("Google Auth error: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {loginForm ? (
        <div className="signup-wrapper">
          <h2 className="title">
            Login <span style={{ color: "var(--theme)" }}>ExpenseMate</span>
          </h2>
          <form>
            <Input
              label="Email"
              type="email"
              state={email}
              setState={setEmail}
              placeholder="johndoe@example.com"
            />
            <Input
              label="Password"
              type="password"
              state={password}
              setState={setPassword}
              placeholder="Enter your password"
            />
            <Button
              disabled={loading}
              text={loading ? "Loading..." : "Login using Email and Password"}
              onClick={loginWithEmail}
            />
            <p className="p-login">OR</p>
            <Button text="Login using Google" blue={true} onClick={googleAuth} />
            <p
              className="p-login"
              style={{ cursor: "pointer" }}
              onClick={() => setLoginForm(false)}
            >
              Don't have an account? Click Here
            </p>
          </form>
        </div>
      ) : (
        <div className="signup-wrapper">
          <h2 className="title">
            Signup on <span style={{ color: "var(--theme)" }}>ExpenseMate</span>
          </h2>
          <form>
            <Input
              label="Full name"
              state={name}
              setState={setName}
              placeholder="John Doe"
            />
            <Input
              label="Email"
              type="email"
              state={email}
              setState={setEmail}
              placeholder="johndoe@example.com"
            />
            <Input
              label="Password"
              type="password"
              state={password}
              setState={setPassword}
              placeholder="Enter a strong password"
            />
            <Input
              label="Confirm Password"
              type="password"
              state={confirmPassword}
              setState={setConfirmPassword}
              placeholder="Confirm your password"
            />
            <Button
              disabled={loading}
              text={loading ? "Loading..." : "Signup using Email and Password"}
              onClick={signupWithEmail}
            />
            <p className="p-login">OR</p>
            <Button text="Signup using Google" blue={true} onClick={googleAuth} />
            <p
              className="p-login"
              style={{ cursor: "pointer" }}
              onClick={() => setLoginForm(true)}
            >
              Already have an account? Click Here
            </p>
          </form>
        </div>
      )}
    </>
  );
}

export default SigninSignup;
