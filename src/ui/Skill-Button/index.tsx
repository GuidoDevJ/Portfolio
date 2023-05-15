import { Text } from "../text"
import style from "./style.module.css"
interface Skill{
    skill:string
}
const Skill=({skill}:Skill)=>{
    return(
        <div className={style.skill}>
            <Text>{skill}</Text>
        </div>
    )
}

export{
    Skill
}