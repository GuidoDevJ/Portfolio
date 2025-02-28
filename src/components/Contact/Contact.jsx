import { Title } from 'src/ui/text';
import { Form } from '../Form/Form';
import style from './style.module.css';

const Contact = () => {
  return (
    <div className={style.container} id="Contact">
      <Title>Contact</Title>
      <span></span>
      <div className={style.formContainer}>
        <Form />
      </div>
    </div>
  );
};

export { Contact };
