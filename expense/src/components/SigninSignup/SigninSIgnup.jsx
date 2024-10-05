import "./SigninSignup.css"
import Input from "../InputComp/Index"
import { useState } from "react";
import Button from "../Button";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth} from "../../firebase.js"



function SigninSignup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading,setLoading] = useState(false);
    
    function signupWithEmail(){
      setLoading(true);
      console.log("name",name);
      console.log("email",email);
      console.log("password",password);
      console.log("confirm password",confirmPassword);




      if(name!="" && email!="" && password!="" && confirmPassword!=""){
        if(password==confirmPassword){
          createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          console.log(user);
          toast.success("User Created!!")
          setLoading(false);
          setName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
           //Create a Document of User
           createDoc(user);
          })
         .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
       // ..
         });
        }else{
          toast.error("Passwords do not match");
          setLoading(false);
        }
        
      }else{
        toast.error("All Fields are mandatory");
        setLoading(false);
      }
      

    }

    function createDoc(user){

    }
    return (
        <div className="signup-wrapper">
            <h2 className="title">
                Sign up on <span style={{color:"var(--theme)"}}>ExpenseMate</span>
            </h2>
            <form>
                <Input
                    label={"Full name"}
                    state={name}
                    setState={setName}
                    placeHolder={"Varad Bhat"}
                />
                <Input
                    label={"Email"}
                    type="email"
                    state={email}
                    setState={setEmail}
                    placeHolder={"varadhat17@gmail.com"}
                />
                <Input
                    label={"Password"}
                    type="password"
                    state={password}
                    setState={setPassword}
                    placeHolder={"varad@123"}
                />
                <Input
                    label={"Confirm Password"}
                    type="password"
                    state={confirmPassword}
                    setState={setConfirmPassword}
                    placeHolder={"varad@123"}
                />
                <Button  disabled={loading}text={loading ? "Loading....." :"Signup using Email and password"} onClick={signupWithEmail}/>
                <p style={{textAlign:"center",margin:0}}>OR</p>
                <Button text={"Signup using Google"} blue={true}/>
            </form>
        </div>
    );
}

export default SigninSignup;