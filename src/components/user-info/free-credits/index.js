import { h, Component } from 'preact';
import Card from '../../card'
import Input from '../../input'
import { Spin } from 'antd'

import style from './style.css'

class FreeCredits extends Component{
    constructor(props){
        super(props);

        this.state = {
            value: '',
            success: false,
        }
    }

    onChange = (e) => {
        const { value } = e.target;
        
        this.setState({
            value,
            isValid: !!value.match(/^\d+(\.\d+){0,1}$/),
            success: false,
        })
    }

    onAdd = () => {
        this.state.isValid && this.props.addCredit(this.state.value, this.props.userId)
    }

    componentWillReceiveProps(nextProps){
        const { credits = {} } = this.props;
        const { credits : nextCredits = {} } = nextProps;

        (credits.isProcessing === true && !nextCredits.errorMsg) 
            && this.setState({ value: '', success: true });
    }

    render(){
        const { credits = {} } = this.props;

        return (
            <Card class={style.creditsCard}>
                <div class={style.creditsContainer}>
                    <div>Add free credits</div>
                    <Input placeholder="0.00" onChange={this.onChange} value={this.state.value} disabled={credits.isProcessing}/>
                </div>
                
                {
                    credits.isProcessing ? 
                        <div style={{marginLeft: 20}}><Spin size='large'/></div>
                        : this.state.value 
                            && (this.state.isValid ?
                                <button class='saveBtn' onClick={this.onAdd}>Add credits</button>
                                :  <div style={{color: 'red',fontStyle: 'italic'}}>Enter correct number</div>)
                }
                { this.state.success && <span style={{marginRight: 10, color: "green"}}>OK</span> }
                { credits.errorMsg && <div style={{color: 'red',fontStyle: 'italic'}}>{credits.errorMsg}</div> }
            </Card>
        )
    }
}

export default FreeCredits;