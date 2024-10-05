function Button({text,onClick,blue}){
    return(
        <div className={blue ? "btn blue" : "btn"} onClick={onClick}>
          Button Text
        </div>

    )
}
export default Button