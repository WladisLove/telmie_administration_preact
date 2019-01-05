import { h, Component } from 'preact';
import Input from '../../input'
import Select from '../../select'
import Textarea from '../../textarea'
import Card from '../../card'
import ApproveArea from './approve-area'

import style from './style.css';

const fillUserInfo = (user) =>{
    const {location = null, mobile, pro={}, dateOfBirth} = user;
    const {category = '', subCategory='',profession,professionDescription, costPerMinute = 0, video} = pro ? pro : {};
    const {country,city,line1,postCode} = JSON.parse(location) ? JSON.parse(location) : {};

    return {
        mobile,
        dateOfBirth,
        country,
        city,
        line1,
        postCode,
        pro: {
            category,
            subCategory,
            profession,
            professionDescription,
            costPerMinute,
            video,
        }
    }
}

class BusinessProDetail extends Component {
    constructor(props){
        super(props);

        const { user = {} } = props;

        this.state = {
            userInfo: fillUserInfo(user),
            isEdited: false,
        };
    }

    onChange = (e) => {
        const {name, value} = e.target;

        (['category','subCategory','profession','professionDescription','costPerMinute','video',].indexOf(name) + 1) ? (
            this.setState( prev => ({
                userInfo: {
                    ...prev.userInfo,
                    pro: {
                        ...prev.userInfo.pro,
                        [name]: value,
                    }
                },
                isEdited: true,
            }))
        ) : (
            this.setState( prev => ({
                userInfo: {
                    ...prev.userInfo,
                    [name]: value,
                },
                isEdited: true,
            }))
        )
        
    }

    onSelectCategory = (e) => {
        const {value} = e.target;
		this.setState(prev => ({
                userInfo: {
                    ...prev.userInfo,
                    pro: {
                        ...prev.userInfo.pro,
                        category: value,
                        subCategory: '',
                    }
                },
                isEdited: true,
            })
        )
    }

    onCancel = () => {
        const { user = {} } = this.props;
        this.setState({
            userInfo: fillUserInfo(user),
            isEdited: false,
        });
    }
    onSave = () => {
        this.props.saveUserInfo({
            ...this.state.userInfo,
            id: this.props.user.id,
        }, false);
    }

    componentWillUnmount(){
        this.props.controlsFunc && this.props.controlsFunc.clearStatus
            && this.props.controlsFunc.clearStatus();
    }

    render(){
        const {categories, subCategories, isPending, activateUser, controlsFunc, changedFields } = this.props;
        const { userInfo = {}, isEdited } = this.state;
        const { country,city,line1,postCode, mobile, pro={}, dateOfBirth} = userInfo;
        const {category, subCategory,profession,professionDescription, costPerMinute = 0, video} = pro ? pro : {};

        return (
            <div class={''}>
                <div class='headline'>Individual Pro details</div>
                <Card cardClass={style.proDetailsCard} class={style.cardContent}>
                    <div class={style.detailsArea}>
                        {/*<Input label='Business name:' name='' disabled={isPending}/>
                        <Input label='Companies House registration number:' name='' disabled={isPending}/>*/}
                        <Input label='Personal address :' name='line1' value={line1} disabled={isPending || true} changedFields={changedFields}/>
                        <div class='doubleInput'>
                            <Input label='City:' name='city' value={city} disabled={isPending || true} changedFields={changedFields}/>
                            <Input label='Post Code:' name='postCode' value={postCode} disabled={isPending || true} changedFields={changedFields}/>
                        </div>
                        <Input label='Country:' name='country' value={country} disabled={isPending || true} changedFields={changedFields}/>

                        <Input type='date' label='Date of birth:' name='dateOfBirth' value={dateOfBirth} disabled={isPending || true} changedFields={changedFields}/>

                        <Input label='Service name:' name='profession' value={profession} disabled={isPending} onChange={this.onChange} changedFields={changedFields}/>
                        <Select label='Service category:' name='category' value={category} data={categories} onChange={this.onSelectCategory} isArrayData disabled={isPending} changedFields={changedFields}/>
                        <Select label='Service sub-category:' name='subCategory' value={subCategory} data={subCategories[category] ? subCategories[category] : []} onChange={this.onChange} isArrayData disabled={isPending} changedFields={changedFields}/>
                        <Textarea label='Service description:' name='professionDescription' value={professionDescription} disabled={isPending} onChange={this.onChange} changedFields={changedFields}/>
    
                        <div style={{display: 'inline-block',width: '20%'}}>
                            <Input value={'£'} disabled={true} inputStyle={{textAlign: 'center'}} changedFields={changedFields}/>
                            {/*<Select isArrayData value={'£'}/>*/}
                        </div>
                        <div style={{display: 'inline-block',width: '47%', marginLeft: '3%'}}>
                            <Input name='5' name='costPerMinute' value={costPerMinute} disabled={isPending} onChange={this.onChange} inputStyle={{textAlign: 'center'}} changedFields={changedFields}/>
                        </div>
                        <div style={{display: 'inline-block',width: '27%', marginLeft: '3%'}}>
                            <Input value={'min'} disabled={true} inputStyle={{textAlign: 'center'}} changedFields={changedFields}/>
                            {/*<Select data={['test','test2']} isArrayData value={'min'}/>*/}
                        </div>

                        <Input label='Mobile:' name='mobile' value={mobile} disabled={isPending || true} changedFields={changedFields}/>
                        <Input label='YouTube ID:' name='video' value={video} disabled={isPending} changedFields={changedFields} onChange={this.onChange} />
                    </div>

                    {isPending && <ApproveArea activateUser={activateUser} controlsFunc={controlsFunc} userId = {this.props.user.id}/>}

                    <div class={style.controls}>
                        {
                            (isEdited) && [
                                <button class='cancelBtn' onClick={this.onCancel}>Cancel</button>,
                                <button class='saveBtn' onClick={this.onSave}>Save</button>
                            ]
                        }
                    </div>
                </Card>
            </div>
        )
    }
}

export default BusinessProDetail;