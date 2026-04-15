import { BurgerIcon } from "../../ui/Icons";
import { Linker } from "src/ui/Link";
import { useWidthAndHeight } from "src/Hooks";
import { useLanguage } from "src/context/LanguageContext";
import { BREAKPOINTS } from "src/constants";
import style from "./style.module.css";

const List = () => {
  const { width, active, ShowList } = useWidthAndHeight();
  const { t } = useLanguage();
  const isMobile = width <= BREAKPOINTS.mobile;

  const navItems = [
    { key: "home", label: t.nav.home, href: "Home" },
    { key: "about", label: t.nav.about, href: "About" },
    { key: "projects", label: t.nav.projects, href: "Projects" },
    { key: "experience", label: t.nav.experience, href: "Experience" },
    { key: "contact", label: t.nav.contact, href: "Contact" },
  ];

  return (
    <>
      {isMobile && <BurgerIcon action={ShowList} />}
      <ul
        className={`${isMobile ? style.hidden : style.list} ${
          active ? style.listActive : ""
        }`}
      >
        {navItems.map((item) => (
          <Linker key={item.key} text={item.label} href={item.href} />
        ))}
      </ul>
    </>
  );
};

export { List };
