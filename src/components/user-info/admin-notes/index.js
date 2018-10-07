import { h, Component } from 'preact';
import style from './style.css';
import Card from '../../card'
import NoteItem from './note-item'


class AdminNotes extends Component {
    state={
        note: ''
    }

    onChange = (e) => this.setState({note: e.target.value});

    saveNote = () => {
        this.state.note && this.props.saveNote(this.state.note);
        // clear state.note
    }

    render(){
        return (
            <Card cardClass={style.adminNotesCard}>
                <div style={{display: 'flex'}}>
                    <div class={style.taLabel}>Admin Notes</div>
                    <textarea rows={3} class={style.ta} value={this.state.note} onChange={this.onChange}/>
                </div>
                <button class={style.saveNoteBtn} onClick={this.saveNote}>Save</button>
    
                <NoteItem date='05/10/18 @ 15:38'
                    text='Your Pro application is pending approval by Telmie. Until then you are invisible in search but can receive free calls from existing client. We will send you an email when the verification is complete.'/>
            </Card>
        )
    }
    
}

export default AdminNotes;