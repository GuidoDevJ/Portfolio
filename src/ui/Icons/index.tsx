import Burger from "public/images/Burger.svg"

const BurgerIcon =({action}:any)=>{
    return(
        <img src={Burger} alt="burger" onClick={()=>action()}/>
    )
}

export {
    BurgerIcon
}