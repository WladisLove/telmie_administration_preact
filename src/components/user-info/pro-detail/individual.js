import { h, Component } from 'preact';
import style from './style.css';
import Input from '../../input'
import Select from '../../select'
import Textarea from '../../textarea'
import Card from '../../card'

class IndividualProDetail extends Component {
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
        const {category, subCategory} = this.state;
        const {categories, subCategories} = this.props;

        return (
            <div class={''}>
                <div class='headline'>Individual Pro details</div>
                <Card cardClass={style.proDetailsCard}>
                    <div style={{maxWidth: 700}}>
                        <Textarea label='Personal address:'/>
                        <div class='doubleInput'>
                            <Input label='City:' name='1'/>
                            <Input label='Post Code:' name='2'/>
                        </div>
                        <Input label='Country:' name='3'/>
                        <Input label='Service name:' name='4'/>
                        <Select label='Service category:' name='category' value={category} data={categories} onChange={this.onSelectCategory} isArrayData/>
                        <Select label='Service sub-category:' name='subCategory' value={subCategory} data={subCategories[category] ? subCategories[category] : []} onChange={this.onChange} isArrayData/>                    
                        <Textarea label='Service description:'/>
    
                        <div style={{display: 'inline-block',width: '20%'}}>
                            <Select data={['test','test2']} isArrayData/>
                        </div>
                        <div style={{display: 'inline-block',width: '47%', marginLeft: '3%'}}>
                            <Input name='5'/>
                        </div>
                        <div style={{display: 'inline-block',width: '27%', marginLeft: '3%'}}>
                            <Select data={['test','test2']} isArrayData/>
                        </div>
                    </div>
                </Card>
            </div>
        )
    }
}

export default IndividualProDetail;