import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=>{
  const host = "http://localhost:5000"
  const notesInitial=[]
  const [notes, setNotes] = useState(notesInitial)

  // Get All notes
  const getNotes = async()=>{
    //API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFkMDkxMjVlZTliNmJmYjkyNzQxOWNkIn0sImlhdCI6MTY0MTU4OTI4Mn0.s-VtiE8cbhrFC0lvt_LbXB35Unpq_KsOyNdq0r0odQc'
      },
    });
    const json = await response.json()
    setNotes(json)
}

      // Add a note
      const addNote = async(title, description, tag)=>{
          //TODO API call
          const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json',
              'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFkMDkxMjVlZTliNmJmYjkyNzQxOWNkIn0sImlhdCI6MTY0MTU4OTI4Mn0.s-VtiE8cbhrFC0lvt_LbXB35Unpq_KsOyNdq0r0odQc'
            },
            body: JSON.stringify({title, description, tag}) 
          });
          const json = await response.json()
        setNotes(notes.concat(json))
      }
      // Delete a note
      const deleteNote= async (id)=>{
        //TODO API call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
          headers: {
            'Content-Type': 'application/json',
            'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFkMDkxMjVlZTliNmJmYjkyNzQxOWNkIn0sImlhdCI6MTY0MTU4OTI4Mn0.s-VtiE8cbhrFC0lvt_LbXB35Unpq_KsOyNdq0r0odQc'
          },
        });
        const json = await response.json()

        const newNotes = notes.filter((note)=>{return note._id!==id})
        setNotes(newNotes)

      }
      // Edit a note
      const editNote= async (id, title, description, tag)=>{
        //API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: 'PUT', // *GET, POST, PUT, DELETE, etc.
          headers: {
            'Content-Type': 'application/json',
            'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFkMDkxMjVlZTliNmJmYjkyNzQxOWNkIn0sImlhdCI6MTY0MTU4OTI4Mn0.s-VtiE8cbhrFC0lvt_LbXB35Unpq_KsOyNdq0r0odQc'
          },
          body: JSON.stringify({title, description, tag}) 
        });
        const json = await response.json();

        //Logic to edit in Client
        let newNotes = JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < newNotes.length; index++) {
          const element = newNotes[index];
          if (element._id === id) {
            newNotes[index].title = title;
            newNotes[index].description = description;
            newNotes[index].tag = tag;
            break;
          }
        }
        setNotes(newNotes);
      }
    return (
        <NoteContext.Provider value = {{notes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;