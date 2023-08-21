import style from "./style.module.css"
const Form = () => {
    return (
        <>
            <form className={style.form}>
                <div className={`${style.form_group}`}>
                    <label htmlFor="name">Nombre completo</label>
                    <input id="name" type="text" />
                </div>

                <div className={`${style.form_group}`}>
                    <label htmlFor="mail">Correo electrónico</label>
                    <input id="mail" type="email" />
                </div>
                <div className={`${style.form_group}`}>
                    <label htmlFor="msg">Message</label>
                    <textarea name="msg" id="msg" cols="30" rows="10"></textarea>
                </div>
                <div className={`${style.buttonContainer}`}>
                    <button>Enviar</button>
                </div>
            </form>

        </>
    )
}
export {
    Form
}