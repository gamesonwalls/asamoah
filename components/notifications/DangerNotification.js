import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; 

export function Notification({type,message}) {

    const notyf = new Notyf({
        duration:3000,
        position: {
            x: 'right',
            y: 'top',
        },
        types: [
            {
                type: 'error',
                background: '#FA5151',
                icon: {
                    className: 'fas fa-times',
                    tagName: 'span',
                    color: '#fff'
                },
                dismissible: false
            }
        ]
    });
    notyf.open({
        type: type,
        message: message
    });

    return notyf


  
}
