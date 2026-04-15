import { SocialBotton } from "../BottonMedia";
import styles from "./styles.module.css";
import { SOCIAL_LINKS } from "src/constants";

export const SocialMedia = () => {
  return (
    <div className={styles.socialContainer}>
      <div>
        <h2>Social</h2>
        <ul className={styles.socialUl}>
          {SOCIAL_LINKS.map((social) => (
            <li key={social.name}>
              <SocialBotton font={social.icon} url={social.url} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
