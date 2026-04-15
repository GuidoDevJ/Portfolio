import { Title, Text } from "src/ui/text";
import { Button } from "src/ui/Button/Button";
import { Down } from "src/ui/Down";
import { PixelRobot } from "src/ui/PixelRobot";
import { useLanguage } from "src/context/LanguageContext";
import style from "./style.module.css";

const Hero = () => {
  const { t } = useLanguage();

  return (
    <div className={style.mainHero}>
      <div className={style.container} id="Home">
        <div className={style.text}>
          <Title>{t.hero.greeting}</Title>
          <Text>{t.hero.subtitle}</Text>
          <Button>
            <a href="#Contact">{t.hero.cta}</a>
          </Button>
        </div>
        <div className={style.blobContainer}>
          <PixelRobot />
        </div>
      </div>
      <Down />
    </div>
  );
};

export { Hero };
