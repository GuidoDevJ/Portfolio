import style from "./style.module.css"
import { sendEmail } from "../../helpers/index"
const FormContact = () => {
    const handlerSubmit = async (e:Event)=>{
        e.preventDefault();
        const form = e.target as HTMLFormElement;
           // Obtener los valores de los campos del formulario
           const name = (document.getElementById("name") as HTMLInputElement).value;
           const email = (document.getElementById("mail") as HTMLInputElement).value;
           const message = (document.getElementById("msg") as HTMLInputElement).value;
        
           if(name === "" || email === "" || message === "") return alert("Complete todos los campos")
           // Hacer lo que necesites con los datos (por ejemplo, enviarlos a través de una solicitud HTTP)
          const emailResponse = await sendEmail({name,email,message})
          form.reset()
    }
    return (
        <>
            <form className={style.form} onSubmit={(e:any) =>handlerSubmit(e) }>
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
                    <textarea name="msg" id="msg" cols={30} rows= {10} />
                </div>
                <div className={`${style.buttonContainer}`} onClick={()=>{console.log("Hola")}}>
                    <button>Enviar</button>
                </div>
            </form>

        </>
    )
}
export {
    FormContact
}