import { Text, Title } from "src/ui/text";
import style from "./style.module.css";
import { FormContact } from "../Form/Form";

const Contact = () => {
    return (
        <div className={style.container} id="Contact">
            <Title>Contact</Title>
            <span></span>
            <div className={style.formContainer}>
                <FormContact/>
            </div>
        </div>
    );
};

export { Contact };
    function handlerSubmit(e: any, Event: { new(type: string, eventInitDict?: EventInit | undefined): Event; prototype: Event; readonly NONE: 0; readonly CAPTURING_PHASE: 1; readonly AT_TARGET: 2; readonly BUBBLING_PHASE: 3; }) {
        throw new Error("Function not implemented.");
    }

