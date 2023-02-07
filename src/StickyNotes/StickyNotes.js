import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import StickyNoteCard from "./StickyNoteCard";

const StickyNotes = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [notelist, setNoteList] = useState([]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    let newnote = {
      id: uuidv4(),
      notetitle: title,
      notedescription: description,
      pin: false,
      edit: false,
    };
    let updatednotelist = [...notelist, newnote];
    setNoteList(updatednotelist);
    setTitle("");
    setDescription("");
    localStorage.setItem("listData", JSON.stringify(updatednotelist));
  };

  const handleOnChangeTitle = (e) => {
    const { value } = e.target;
    setTitle(value);
  };

  const handleOnChangeDescription = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setDescription(value);
  };

  const handleOnDeleteItem = (id) => {
    const newlist = notelist.filter((item) => {
      return item.id !== id;
    });
    setNoteList(newlist);
    localStorage.setItem("listData", JSON.stringify(newlist));
  };

  const handleOnPinItem = (id) => {
    let selectednote = notelist;
    if (selectednote[id].pin === true) {
      selectednote[id].pin = false;
    } else {
      selectednote[id].pin = true;
    }

    localStorage.setItem("listData", JSON.stringify(notelist));

    setNoteList(selectednote);
    window.location.reload();
  };

  useEffect(() => {
    const storageData = localStorage.getItem("listData");
    if (storageData) {
      setNoteList([...JSON.parse(localStorage.getItem("listData"))]);
    }
  }, []);
  
  return (
    <>
      <nav className="bg-gray-800 text-white py-4 px-5 text-3xl flex justify-between">
        <div className="flex align-center font-serif">Sticky Notes</div>
      </nav>
      <div>
        <h2 className="text-2xl text-center text-white font-serif underline">
          Pined Notes
        </h2>
        <div className="flex space-x-4 mx-5">
          {notelist &&
            notelist.map((value, index) => {
              if (value.pin === true) {
                return (
                  <div key={index}>
                    <StickyNoteCard
                      title={value.notetitle}
                      description={value.notedescription}
                      id={value.id}
                      pin={value.pin}
                      indexvalue={index}
                      handleOnDeleteItem={handleOnDeleteItem}
                      handleOnPinItem={handleOnPinItem}
                      edit={value.edit}
                    />
                  </div>
                );
              }
            })}
        </div>
        <h2 className="text-2xl text-center m-2	text-white font-serif underline">
          Your Notes
        </h2>
        <div className="flex space-x-4 mx-5">
          {notelist &&
            notelist.map((value, index) => {
              if (value.pin === false) {
                return (
                  <div key={index} className="w-60 ">
                    <StickyNoteCard
                      title={value.notetitle}
                      description={value.notedescription}
                      id={value.id}
                      pin={value.pin}
                      indexvalue={index}
                      handleOnDeleteItem={handleOnDeleteItem}
                      handleOnPinItem={handleOnPinItem}
                    />
                  </div>
                );
              }
            })}
          <form onSubmit={handleOnSubmit}>
            <div className="px-5 w-72">
              <div className="h-72 bg-gray-100 flex flex-col p-3 shadow-md rounded ring-1 ring-gray-200">
                <h2 className="text-2xl font-serif underline">
                  Add a new Note:-
                </h2>
                <div>
                  <label className="font-serif underline">Title:-</label>
                  <br />
                  <input
                    type="text"
                    placeholder="Enter the title"
                    className="my-1 rounded-md border border-black focus:border-blue-600 focus:border-[2px]  focus:outline-none h-10 w-full p-2"
                    value={title}
                    onChange={handleOnChangeTitle}
                  />
                </div>
                <div>
                  <label className="font-serif underline">Description:-</label>
                  <br />
                  <textarea
                    type="text"
                    placeholder="Enter the description"
                    className="my-1 rounded-md border border-black focus:border-blue-600 focus:border-[2px]  focus:outline-none w-full h-[95px] p-2 resize-none"
                    value={description}
                    onChange={handleOnChangeDescription}
                  />
                </div>
                <div className=" flex justify-end ">
                  <button
                    type="submit"
                    className="p-1 bg-blue-900 text-white rounded w-24 justify-end"
                    disabled={title === "" || description === "" ? true : false}
                  >
                    <span>+</span>Add Note
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default StickyNotes;