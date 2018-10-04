import { h, Component } from 'preact';
import style from './style.css';
import Input from '../../input'

const AccountDetail = props =>  {
    return (
        <div class={style.accountDetail}>
            <div style={{width: '100%'}}>
                <div class='headline'>Account details</div>
                <div class='doubleInput'>
                    <Input label='First Name:' name='name'/>
                    <Input label='Last Name:' name='lastName'/>
                </div>
                <Input label='Email:' name='email'/>
            </div>
            
            <div style={{width: 150}}> Avatar </div>
            
        </div>
    )
}

export default AccountDetail;