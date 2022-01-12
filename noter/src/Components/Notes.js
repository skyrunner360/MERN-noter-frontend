import React, { useContext, useState, useEffect, useRef } from "react";
import noteContext from "../Context/notes/noteContext";
import AddNotes from "./AddNotes";
import Noteitem from "./Noteitem";

function Notes() {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);
  const [note, setNote] = useState({
    id:"",
    etitle: "",
    edescription: "",
    etag: "default",
  });
  const updateNote = (currentNote) => {
      //Clicking on the button by using current
      ref.current.click();
      setNote({id: currentNote._id,etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
  };

  const handleclick = () => {
      editNote(note.id, note.etitle, note.edescription, note.etag)
      refclose.current.click();
  };
  const onChange = (e) => {
    // Using spread operator. persist the value of notes but add these values to it meaning change the name according to it's value.
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  // UseRef Gives a reference to an element
  const ref = useRef(null)
  const refclose = useRef(null)
  return (
    <>
      <AddNotes />

      <button
        type="button"
        className="btn d-none btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal" ref={ref}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Your Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    value={note.etitle}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    onChange={onChange}
                    value={note.edescription}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    onChange={onChange}
                    value={note.etag}
                    minLength={5}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refclose}
              >
                Close
              </button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleclick} type="button" className="btn btn-primary">
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-2">
        <h2>Your Notes</h2>
        <div className="container">
        {notes.length===0 && "No notes to Display"}
        </div>
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} updateNote={updateNote} note={note} />
          );
        })}
      </div>
    </>
  );
}

export default Notes;
