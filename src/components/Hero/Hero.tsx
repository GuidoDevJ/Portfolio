import { Title, Text } from "src/ui/text";
import style from "./style.module.css";
import { Button } from "src/ui/Button/Button";
import { Down } from "src/ui/Down";
const Hero = () => {
  return (
    <div className={style.container}>
      <div className={style.text}>
        <Title>Hola, me llamo Guido</Title>
        <Text>
          A Frontend focused Web Developer building the Frontend of Websites and
          Web Applications that leads to the success of the overall product
        </Text>
        <Button>Proyectos</Button>
       <Down/>
        
      </div>
    </div>
  );
};

export { Hero };
