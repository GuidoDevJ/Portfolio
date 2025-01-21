import down  from "../../public/assets/Down.svg";
import style from "./style.module.css"
const Down = () => {
  return (
    <div className={style.container}>
      <img src={`${down.src}`} alt="" width={`50px`} className={style.down} />
      <img src={`${down.src}`} alt="" width={`50px`} className={style.down} />
    </div>
  )
}
export { Down }