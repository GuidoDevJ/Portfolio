import { Button } from "src/ui/Button/Button";
import { Linker } from "src/ui/Link";
import { Text, Title } from "src/ui/text";
import style from "./style.module.css";
const Hero = () => {

  return (
    <div className={style.container}  id="Home">
      <div className={style.text}>
        <Title>Hello, I'm Guido</Title>
        <Text>
          A Software Developer focused on building well performing
          Web Applications that leads to the success of the overall product
        </Text>
        <Button ><Linker text="Proyects"/></Button>
        
      </div>
    </div>
  );
};

export { Hero };

