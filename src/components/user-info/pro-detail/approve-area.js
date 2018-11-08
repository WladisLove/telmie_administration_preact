import { h } from 'preact';
import { Spin } from 'antd'

import style from './style.css';

const ApproveArea = (props) => {
    
    const { activateUser = {}, controlsFunc = {}, userId } = props;
    const { isComplete, error, message, isSuccess } = activateUser;

    const approve = () => controlsFunc.approve(userId);
    const decline = () => controlsFunc.decline(userId);

    return (
        <div class={style.approveArea}>

        {
            isComplete ? [
                (error ? (
                    <div class={`errorContainer ${style.messageContainer}`}>
                        Error! {message}
                    </div>
                ) : <div class={style.messageContainer}>{message}</div>),
                <button class={style.approveBtn} onClick={approve} disabled={isSuccess && isComplete}>Approve</button>,
                <button class={style.declineBtn} onClick={decline} disabled={isSuccess && isComplete}>Decline</button>,
                {/*<button>Ask for more info</button>,*/}
            ] : (
                <div class="spinContainer"><Spin size='large'/></div>
            )
        }
       
            
        </div>
)};

export default ApproveArea;
