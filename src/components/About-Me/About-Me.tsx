import { Subtitle, Text, TextSecondary, Title } from "src/ui/text";
import style from "./style.module.css";
import { Button } from "src/ui/Button/Button";
import { Skill } from "src/ui/Skill-Button";
const AboutMe = () => {
  const skills = [
    "Hmtl",
    "css",
    "javascript",
    "React",
    "NextJs",
    "Express",
    "Node",
    "Git",
    "postgresql",
    "Bootstrap",
    "Firebase",
  ];
  return (
    <div className={style.container} id="About">
      <Title>Sobre Mi</Title>
      <span></span>
      <div className={style.text}>
        <Text>
          Here you will find more information about me, what I do, and my
          current skills mostly in terms of programming and technology
        </Text>
      </div>
      <div className={style.aboutMe}>
        <div className={style.aboutMeText}>
          <Subtitle>Conoceme un poco mejor</Subtitle>
          <TextSecondary>
            I'm a Frontend Web Developer building the Front-end of Websites and
            Web Applications that leads to the success of the overall product.
            Check out some of my work in the Projects section.
          </TextSecondary>
          <TextSecondary>
            I also like sharing content related to the stuff that I have learned
            over the years in Web Development so it can help other people of the
            Dev Community. Feel free to Connect or Follow me on my Linkedin
            where I post useful content related to Web Development and
            Programming
          </TextSecondary>
          <TextSecondary>
            I'm open to Job opportunities where I can contribute, learn and
            grow. If you have a good opportunity that matches my skills and
            experience then don't hesitate to contact me.
          </TextSecondary>
          <Button>Contact</Button>
        </div>
        <div className={style.skillContainer}>
          <Subtitle>My Skills</Subtitle>
          <div className={style.skills}>
            {skills.map((skill) => (
              <Skill skill={skill} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export { AboutMe };
