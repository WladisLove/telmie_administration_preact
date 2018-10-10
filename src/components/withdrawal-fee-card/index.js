import { h, Component } from 'preact';
import Card from '../card'
import Input from '../input'

import style from './style.css'

class WithdrawalFee extends Component{
    constructor(props){
        super(props);

        this.state = {
            isInEdit: false,
            feeData: {
                
            }
        }
    }

    onHeadetBtnClick = () => {
        this.state.isInEdit ? this.saveHandler() : this.editHandler();
    }

    editHandler = () => {
        this.setState(prev => ({isInEdit: !prev.isInEdit}));
    }

    saveHandler = () => {
        alert('save');
        this.setState(prev => ({isInEdit: !prev.isInEdit}));
    }

    onChangeHandler = (e) => {
        const {value, name} = e.target;
        this.setState(prev =>({
            feeData: {
                ...prev.feeData,
                [name]: value,
            }
        }));
    }

    render(){
        const {isInEdit, feeData} = this.state;
        const {
            
        } = feeData;

        const btnText = isInEdit ? "Save" : "Edit";

        return (
            <Card headerText='Withdrawal fee' headerBtnText={btnText} onHeadetBtnClick={this.onHeadetBtnClick}>
                <table class={style.withdrawalTable}>
                    <thead>
                        <tr>
                            <th>Range</th>
                            <th>%</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>£0 - 10</th>
                            <th>
                                <Input inputStyle={{textAlign: 'center'}} 
                                    disabled={!isInEdit}/>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </Card>
        );
    }
} 

export default WithdrawalFee;
