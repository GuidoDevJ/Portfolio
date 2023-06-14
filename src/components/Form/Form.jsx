import style from "./style.module.css"
const Form = () => {
    return (
        <>
            <form className={style.form}>
                <label htmlFor="name">Nombre completo</label>
                <input id="name" type="text" />

                <label htmlFor="mail">Correo electrónico</label>
                <input id="mail" type="email" />

                <label htmlFor="phone">Teléfono móvil</label>
                <input id="phone" type="tel" placeholder="+34" />

                <input type="submit" />
            </form>

        </>
    )
}
export {
    Form
}