import Header from "../components/Header/Header"
import './Signup.css'
import SigninSignup from "../components/SigninSignup/SigninSIgnup"

function Signup() {
  
    return (
      <>
        <Header/>
        <div className="wrapper">
            <SigninSignup/>
        </div>
      </>
    )
}
export default Signup