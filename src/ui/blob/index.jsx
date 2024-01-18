import style from "./styles.module.css"
const Blob = () => {
    return (
        <div className={`${style.container}`} >
            <div className={`${style.animated_blob_image}`}>
                <img src='https://www.northeastexplorers.in/wp-content/uploads/2018/06/kaziranga-rhino-1920x725-1024x387.jpg' alt='' />
            </div>
        </div>
    )
}
export { Blob }