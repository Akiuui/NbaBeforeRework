import { toast } from "react-toastify";

function notifToast(text, position, length, type) {
    console.log("asd")
    toast[type](text,
        {
            position: position,
            hideProgressBar: true,
            pauseOnHover: true,
            autoClose: length
        })
}
export default notifToast;
