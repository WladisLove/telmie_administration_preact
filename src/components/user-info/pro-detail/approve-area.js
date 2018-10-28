import { h } from 'preact';

import style from './style.css';

const ApproveArea = () => (
	<div class={style.approveArea}>
        <button class={style.approveBtn}>Approve</button>
        <button class={style.declineBtn}>Decline</button>
        <button>Ask for more info</button>
    </div>
);

export default ApproveArea;
