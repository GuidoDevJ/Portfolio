import { Title } from "src/ui/text";
import { FormContact } from "../Form/Form";
import { useLanguage } from "src/context/LanguageContext";
import style from "./style.module.css";

const Contact = () => {
  const { t } = useLanguage();

  return (
    <div className={style.container} id="Contact">
      <Title>{t.contact.title}</Title>
      <span className={style.divider}></span>
      <div className={style.formContainer}>
        <FormContact />
      </div>
    </div>
  );
};

export { Contact };
