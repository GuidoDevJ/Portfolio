import { Text, Title } from "src/ui/text"
import style from "./style.module.css";

const Proyect = () => {
    return (
        
            <div className={style.container}>
                <Title>Sobre Mi</Title>
                <span></span>
                {/* <div className={style.text}>
                    <Text>
                        Here you will find more information about me, what I do, and my
                        current skills mostly in terms of programming and technology
                    </Text>
                </div> */}
            </div>
        
    )
}

export {
    Proyect
}