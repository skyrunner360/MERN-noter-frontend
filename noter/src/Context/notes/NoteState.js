import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=>{
    const notesInitial=[
        {
          "_id": "61d8d000ce62485b603b6f0c",
          "user": "61d09125ee9b6bfb927419cd",
          "title": "Test Title",
          "description": "My description",
          "tag": "Personal",
          "date": "2022-01-07T23:42:56.355Z",
          "__v": 0
        },
        {
          "_id": "61d8d001ce62485b603b6f0e",
          "user": "61d09125ee9b6bfb927419cd",
          "title": "Test Title",
          "description": "My description",
          "tag": "Personal",
          "date": "2022-01-07T23:42:57.126Z",
          "__v": 0
        },
        {
          "_id": "61d8d001ce62485b603b6f10",
          "user": "61d09125ee9b6bfb927419cd",
          "title": "Test Title",
          "description": "My description",
          "tag": "Personal",
          "date": "2022-01-07T23:42:57.925Z",
          "__v": 0
        }
      ]
      const [notes, setNotes] = useState(notesInitial)
    return (
        <NoteContext.Provider value = {{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;