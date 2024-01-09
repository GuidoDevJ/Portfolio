import { SocialBotton } from "../BottonMedia";
import styles from "./styles.module.css";
export const SocialMedia = () => {
  const socialMedia = [
    {
      url: "www.linkedin.com/in/guidogauna",
      icon: "fa-brands fa-linkedin-in",
    },
    {
      url: "https://github.com/GuidoDevJ?tab=repositories",
      icon: "fa-brands fa-github",
    },
  ];
  return (
    <div className={`${styles.socialContainer}`}>
      <div>
        <h2>Social</h2>
        <ul className={`${styles.socialUl}`}>
          {socialMedia.map((social, index) => {
            return (
              <li key={index}>
                <SocialBotton font={social.icon} key={index} url={social.url} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
