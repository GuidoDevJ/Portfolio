import Burger from "../../public/assets/Burger.svg"

const BurgerIcon = ({ action }: any) => {
    return (
        <img src={`${Burger.src}`} width={"50px"} alt="burger" onClick={() => action()} />
    )
}

export {
    BurgerIcon
}