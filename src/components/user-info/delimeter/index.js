import { h } from 'preact';
import style from './style.css';

const Delimeter = ({statusText}) =>  {
    const isRed = statusText == 'PENDING_APPROVAL' 
        || statusText == 'STARTED_PRO_APP'
        || statusText == 'ARCHIVED';
    
    return (
        <div class={style.delimeter}>
            <div class={`${style.statusText} ${isRed ? style.pendingStatus : style.userStatus}`}>
                {statusText}
            </div>
        </div>
    )
}

export default Delimeter;