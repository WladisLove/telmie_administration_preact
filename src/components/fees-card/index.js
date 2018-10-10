import { h, Component } from 'preact';
import Card from '../card'
import Input from '../input'

class Fees extends Component{
    constructor(props){
        super(props);

        this.state = {
            isInEdit: false,
            feesData: {
                invitation_discount: '30%',
                telmie_fee: '10%',
                min_call_value: '£10',
                min_authorised_amount: '£10',
                min_call_length: '£10',
                min_telmie_fee: '£10',
                reduced_telmie_fee: '5%',
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
            feesData: {
                ...prev.feesData,
                [name]: value,
            }
        }));
    }

    render(){
        const {isInEdit, feesData} = this.state;
        const {invitation_discount,
            telmie_fee, 
            min_call_value, 
            min_authorised_amount,
            min_call_length,
            min_telmie_fee,
            reduced_telmie_fee,
        } = feesData;

        const btnText = isInEdit ? "Save" : "Edit";
        return (
            <Card headerText='Fees' headerBtnText={btnText} onHeadetBtnClick={this.onHeadetBtnClick}>
                <Input label='Client invitation discount' 
                    name='invitation_discount'
                    value={invitation_discount}
                    onChange = {this.onChangeHandler}
                    isToPlaceholder={true}
                    disabled={!isInEdit}/>

                <Input label='Telmie fee' 
                    info='telmie fee as % of the call value + VAT' 
                    name='telmie_fee'
                    value={telmie_fee}
                    onChange = {this.onChangeHandler}
                    isToPlaceholder={true}
                    disabled={!isInEdit}/>

                <Input label='Minimum Call Value' 
                    info='minimum call value required to charge customer'
                    name='min_call_value'
                    value={min_call_value} 
                    onChange = {this.onChangeHandler}
                    isToPlaceholder={true}
                    disabled={!isInEdit}/>

                <Input label='Minimum Authorised Amount' 
                    info='minimum authorised amount that is authorised on customer card before the call can go ahead' 
                    name='min_authorised_amount'
                    value={min_authorised_amount}
                    onChange = {this.onChangeHandler}
                    isToPlaceholder={true}
                    disabled={!isInEdit}/>

                <Input label='Minimum Call Length' 
                    info='minimum call length required to charge customer' 
                    name='min_call_length'
                    value={min_call_length}
                    onChange = {this.onChangeHandler}
                    isToPlaceholder={true}
                    disabled={!isInEdit}/>

                <Input label='Minimum Telmie Fee' 
                    info='minimum telmie fee, chargable' 
                    name='min_telmie_fee'
                    value={min_telmie_fee}
                    onChange = {this.onChangeHandler}
                    isToPlaceholder={true}
                    disabled={!isInEdit}/>

                <Input label='Reduced Telmie Fee' 
                    info='reduced telmie fee as % of the call + VAT' 
                    name='reduced_telmie_fee'
                    value={reduced_telmie_fee}
                    onChange = {this.onChangeHandler}
                    isToPlaceholder={true}
                    disabled={!isInEdit}/>
            </Card>
        );
    }
} 

export default Fees;
