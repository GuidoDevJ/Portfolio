import { Subtitle, Text, TextSecondary, Title } from "src/ui/text";
import style from "./style.module.css";
const AboutMe = () => {
  return (
    <div className={style.container} id="About">
      <Title>About Me</Title>
      <div className={style.text}>
        <Text>
          Here you will find more information about me, what I do, and my
          current skills mostly in terms of programming and technology
        </Text>
      </div>
      <div className={style.aboutMe}>
        <div className={style.aboutMeText}>
          <Subtitle> A little more</Subtitle>
          <TextSecondary>
          I'm a software developer, who is always trying to be a little better everyday, 
          so I really like watching, listening and reading about technologies and their uses.
          </TextSecondary>
          <TextSecondary>
            I also like sharing content related to the stuff that I have learned
            over the years in Web Development so it can help other people of the
            Dev Community. Feel free to Connect or Follow me on my Linkedin
          </TextSecondary>
          <TextSecondary>
            I'm open to Job opportunities where I can contribute, learn and
            grow. If you have a good opportunity that matches my skills and
            experience then don't hesitate to contact me.
          </TextSecondary>
        </div>
      </div>
    </div>
  );
};

export { AboutMe };

