import React, {useContext} from 'react'
import noteContext from '../Context/notes/noteContext'


const Noteitem = (props) => {
    const context = useContext(noteContext)
    const {deleteNote} = context;
    const {note, updateNote} = props;
    return (
        <div className='col-md-3'>
            <div className="card my-3">
  <div className="card-body">  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">{note.tag}</span>
      <div className="d-flex align-items-center">
    <h5 className="card-title">{note.title}</h5><i className="fas fa-trash mx-2" onClick={()=>{deleteNote(note._id)}}></i>
    <i className="fas fa-edit mx-2" onClick={()=>{updateNote(note)}}></i>
      </div>
    <p className="card-text">{note.description}</p>
  </div>
</div>
        </div>
    )
}

export default Noteitem

