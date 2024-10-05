import "./SigninSignup.css"
import Input from "../InputComp/Index"
import { useState } from "react";
function SigninSignup() {
    const [name,setName]=useState("");
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
             state={email}
             setState={setEmail}
             placeHolder={"varadhat17@gmail.com"}
            />
            <Input
             label={"Password"}
             state={password}
             setState={setPassword}
             placeHolder={"varad@123"}
            />
            <Input
             label={"Confirm Password"}
             state={confirmPassword}
             setState={setConfirmPassword}
             placeHolder={"varad@123"}
            />
            

        </form>

      </div>
    );
}
export default SigninSignup