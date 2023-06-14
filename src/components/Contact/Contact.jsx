import { Text, Title } from "src/ui/text";
import style from "./style.module.css";
import { Form } from "../Form/Form";

const Contact = () => {
    return (
        <div className={style.container}>
            <Title>Contact</Title>
            <span></span>
            <div className={style.formContainer}>
                <Form />
            </div>
        </div>
    );
};

export { Contact };
