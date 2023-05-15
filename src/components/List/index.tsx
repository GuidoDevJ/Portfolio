// UI
import { BurgerIcon } from "../../ui/Icons";
import { Linker } from "src/ui/Link";
// Custom Hook
import { useWidthAndHeight } from "src/Hooks";
// Style
import style from "./style.module.css";

const List = () => {
    const { width, active, ShowList } = useWidthAndHeight();



    const showListOrBurget = () => {
        return (
            <>
                {width <= 600 ? <BurgerIcon action={ShowList} /> : null}
                <ul
                    className={`${width <= 600 ? style.hidden : style.list} ${active ? style.listActive : " "
                        }`}
                >
                    <Linker text="Home" />
                    <Linker text="About" />
                    <Linker text="Proyects" />
                    <Linker text="Contact" />
                </ul>
            </>
        );
    };
    return <>{showListOrBurget()}</>;
};

export { List };
