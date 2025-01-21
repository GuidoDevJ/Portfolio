interface Email{
    message : string;
    email:string;
    name:string;
}
const sendEmail = async (email:Email)=>{
    console.log("email",email)
    try {
        const res = await fetch('https://g-notifications.onrender.com/message',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(email)
        })
        const data = await res.json(); 
        return data;
    } catch (error) {
        console.log(error)
    }

}

export {sendEmail}