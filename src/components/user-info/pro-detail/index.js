import { h, Component } from 'preact';
import Input from '../../input'
import Select from '../../select'
import Textarea from '../../textarea'
import Card from '../../card'
import ApproveArea from './approve-area'

import style from './style.css';

class BusinessProDetail extends Component {
    constructor(props){
        super(props);

        this.state = {
            category: '',
            subCategory: '',
        };
    }

    onChange = (e) => {
        const {name, value} = e.target;

        this.setState( prev => ({
            ...prev,
            [name]: value,
        }))
    }

    onSelectCategory = (e) => {
        const {value} = e.target;
		this.setState(prev => ({
                ...prev,
                category: value,
                subCategory: '',
            })
        )
    }
	

    render(){
        //const {category, subCategory} = this.state;
        const {categories, subCategories, isPending, user = {}, activateUser, controlsFunc, changedFields } = this.props;
        const {location = null, mobile, video, pro={}} = user;
        const {category, subCategory,profession,professionDescription, costPerMinute = 0} = pro ? pro : {};
        const {country,city,line1,postCode} = JSON.parse(location) ? JSON.parse(location) : {};

        return (
            <div class={''}>
                <div class='headline'>Individual Pro details</div>
                <Card cardClass={style.proDetailsCard} class={style.cardContent}>
                    <div class={style.detailsArea}>
                        {/*<Input label='Business name:' name='' disabled={isPending}/>
                        <Input label='Companies House registration number:' name='' disabled={isPending}/>*/}
                        <Input label='Personal address :' name='line1' value={line1} disabled={isPending} changedFields={changedFields}/>
                        <div class='doubleInput'>
                            <Input label='City:' name='city' value={city} disabled={isPending} changedFields={changedFields}/>
                            <Input label='Post Code:' name='postCode' value={postCode} disabled={isPending} changedFields={changedFields}/>
                        </div>
                        <Input label='Country:' name='country' value={country} disabled={isPending} changedFields={changedFields}/>

                        {/* date */}

                        <Input label='Service name:' name='profession' value={profession} disabled={isPending} changedFields={changedFields}/>
                        <Select label='Service category:' name='category' value={category} data={categories} onChange={this.onSelectCategory} isArrayData disabled={isPending} changedFields={changedFields}/>
                        <Select label='Service sub-category:' name='subCategory' value={subCategory} data={subCategories[category] ? subCategories[category] : []} onChange={this.onChange} isArrayData disabled={isPending} changedFields={changedFields}/>
                        <Textarea label='Service description:' name='professionDescription' value={professionDescription} disabled={isPending} changedFields={changedFields}/>
    
                        <div style={{display: 'inline-block',width: '20%'}}>
                            <Input value={'£'} disabled={true} inputStyle={{textAlign: 'center'}} changedFields={changedFields}/>
                            {/*<Select isArrayData value={'£'}/>*/}
                        </div>
                        <div style={{display: 'inline-block',width: '47%', marginLeft: '3%'}}>
                            <Input name='5' name='costPerMinute' value={costPerMinute} disabled={isPending} inputStyle={{textAlign: 'center'}} changedFields={changedFields}/>
                        </div>
                        <div style={{display: 'inline-block',width: '27%', marginLeft: '3%'}}>
                            <Input value={'min'} disabled={true} inputStyle={{textAlign: 'center'}} changedFields={changedFields}/>
                            {/*<Select data={['test','test2']} isArrayData value={'min'}/>*/}
                        </div>

                        <Input label='Mobile:' name='mobile' value={mobile} disabled={isPending} changedFields={changedFields}/>
                        <Input label='YouTube ID:' name='video' value={video} disabled={isPending} changedFields={changedFields}/>
                    </div>

                    {isPending && <ApproveArea activateUser={activateUser} controlsFunc={controlsFunc} userId = {user.id}/>}
                </Card>
            </div>
        )
    }
}

export default BusinessProDetail;