import Dowm from "public/assets/Down.svg"
import style from "./style.module.css"
const Down = () => {
  return (
    <div className={style.container}>
      <img src={Dowm} alt="" width={`50px`} className={style.down} />
      <img src={Dowm} alt="" width={`50px`} className={style.down} />
    </div>
  )
}
export { Down }