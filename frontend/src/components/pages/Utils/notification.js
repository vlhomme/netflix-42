import { toast } from 'react-toastify';

export const fireNotification  = (style, msg) => {
    toast[style](msg, {
        position: toast.POSITION.TOP_RIGHT
    })
}


