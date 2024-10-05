import "./Header.css"
function Header() {
  let LogoutFnc = ()=>{
    alert("User logged Out")
  }
  
    return (
      <>
        <div className="navbar">
          <p className="logo">ExpenseMate</p>
          <p className="logo link" onClick={LogoutFnc}>
            Logout
          </p>
        </div>
      </>
    )
}
export default Header