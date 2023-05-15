// Components
import {List} from "../List/index"
// UI
import Logo from "../../../public/images/Logo.svg"
// Style
import style from "./style.module.css"
const Header = () => {
  return (
    <div className={style.container}>
        <div className={style.containerImg}>
            <img src={Logo} alt="" className="hvr-buzz-out" />
        </div>
        <List/>
    </div>
  )
}


export {Header}