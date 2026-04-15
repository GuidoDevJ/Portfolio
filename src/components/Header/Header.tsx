import { List } from "../List/index";
import { ThemeToggle } from "src/ui/ThemeToggle";
import { LanguageToggle } from "src/ui/LanguageToggle";
import style from "./style.module.css";

const Header = () => {
  return (
    <nav className={style.container}>
      <div className={style.containerImg}>
        <a href="#Home" aria-label="Go to home">
          <img src="/assets/Logo.svg" alt="Logo" className="hvr-buzz-out" />
        </a>
      </div>
      <div className={style.navContainer}>
        <List />
        <div className={style.toggles}>
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export { Header };
