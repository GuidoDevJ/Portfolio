import { SocialMedia } from "src/ui/Social-Media/socialMedia";
import styles from "./styles.module.css";
const Footer = () => {
  return (
    <>
      <footer className={`${styles.footerContainer}`}>
        <div className={`${styles.mainFooter}`}>
          <SocialMedia />
          <div className={`${styles.containerTextFooter}`}>
            <h2>Guido Gauna</h2>
            <p>
              A Frontend focused Web Developer building the Frontend of Websites
              and Web Applications that leads to the success of the overall
              product
            </p>
          </div>
        </div>
        <hr />
        <div className={`${styles.mainFooterDown}`}>
            <span>Copyright 2023 guido alejandro</span>
          </div>
      </footer>
    </>
  );
};
export { Footer };
