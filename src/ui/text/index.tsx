import style from "./style.module.css"
const Title = ({children}:any) => {
  return (
    <h1 className={style.title}>{children}</h1>
  )
}

const Text = ({children}:any)=>{
    return(
        <p className={style.p_primary}>{children}</p>
    )
}
const TextSecondary = ({children}:any)=>{
    return(
        <p className={style.p_secondary}>{children}</p>
    )
}
const Subtitle =({children}:any)=> {
  return (
    <h2 className={style.subtitle}>{children}</h2>
  )
}

export {
    Title,Text,Subtitle,TextSecondary
}
