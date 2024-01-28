import { Title, Text } from "src/ui/text";
import style from "./style.module.css";
import { Button } from "src/ui/Button/Button";
import { Down } from "src/ui/Down";
import { Linker } from "src/ui/Link";
import { Blob } from "src/ui/blob/index";
const Hero = () => {
  return (
    <div className={style.mainHero}>
      <div className={style.container} id="Home">
        <div className={style.text}>
          <Title>Hello, I'm Guido</Title>
          <Text>
            A Software Developer focused on building well performing Web
            Applications that leads to the success of the overall product
          </Text>
          <Button>
            <Linker text="Proyects" />
          </Button>
        </div>
        <div className={style.blobContainer}>
        <Blob />
        </div>
      </div>
        <Down />
    </div>
  );
};

export { Hero };
