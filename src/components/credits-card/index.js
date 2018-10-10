import { h, Component } from 'preact';
import Card from '../card'
import Input from '../input'

class Credits extends Component{
    constructor(props){
        super(props);

        this.state = {
            isInEdit: false,
            creditsData: {
                friend_invitation_credit: '5',
                pro_invitation_credit: '10',
                bonus_credit: '10',
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
            creditsData: {
                ...prev.creditsData,
                [name]: value,
            }
        }));
    }

    render(){
        const {isInEdit, creditsData} = this.state;
        const {
            friend_invitation_credit,
            pro_invitation_credit,
            bonus_credit,
        } = creditsData;

        const btnText = isInEdit ? "Save" : "Edit";

        return (
            <Card headerText='Credits' headerBtnText={btnText} onHeadetBtnClick={this.onHeadetBtnClick}>
                <Input label='Friend Invitation Credit' 
                    name='friend_invitation_credit'
                    value={friend_invitation_credit}
                    onChange = {this.onChangeHandler}
                    isToPlaceholder={true}
                    disabled={!isInEdit}/>

                <Input label='Pro Invitation credit' 
                    name='pro_invitation_credit'
                    value={pro_invitation_credit}
                    onChange = {this.onChangeHandler}
                    isToPlaceholder={true}
                    disabled={!isInEdit}/>

                <Input label='Bonus credit' 
                    name='bonus_credit'
                    value={bonus_credit} 
                    onChange = {this.onChangeHandler}
                    isToPlaceholder={true}
                    disabled={!isInEdit}/>
            </Card>
        );
    }
} 

export default Credits;
