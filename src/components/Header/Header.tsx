// Components
import { List } from "../List/index"
// UI
import Logo from "../../public/assets/Logo.svg"
// Style
import style from "./style.module.css"
import { useEffect, useRef, useState } from "react";
const Header = () => {
  return (
    <div className={style.container}>
      <div className={style.containerImg}>
        <img src={`${Logo}`} alt="" className="hvr-buzz-out" />
      </div>
      <List />
    </div>
  )
}


export { Header }