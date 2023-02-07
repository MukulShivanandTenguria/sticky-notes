import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEllipsisV,
  faStar,
  faPenToSquare,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

const StickyNoteCard = (props) => {
  const [editicon, setEditIcon] = useState(true);
  const [titledisable, setTitleDisable] = useState(true);
  const [notetitle, setNotetitle] = useState(props.title)
  const [notedescription, setNoteDescription] = useState(props.description)
  
  const getIndex = (e) => {
    const { value } = e.currentTarget;
    console.log(e.currentTarget.value);
    props.handleOnDeleteItem(value);
  };

  const addToPin = (e) => {
    const { value } = e.currentTarget;
    props.handleOnPinItem(value);
  };

  const editNote = (e) => {
    const { value } = e.currentTarget;
    setEditIcon(!editicon);
    setTitleDisable(!titledisable);
    if(editicon===false){
      let data=JSON.parse(localStorage.getItem("listData"))
      data[props.indexvalue].notetitle=notetitle
      data[props.indexvalue].notedescription=notedescription
      console.log(data[props.indexvalue]);
      localStorage.setItem("listData", JSON.stringify(data));
      window.location.reload();
    }
  };

  return (
      <div className="w-60 h-72 bg-gray-100  flex-col p-3 shadow-md rounded ring-1 ring-gray-200">
        <div className="flex justify-between">
          <div>
            <h2 className="text-2xl font-serif underline">
              Note:-{props.indexvalue}
            </h2>
          </div>
          <div className="space-x-2">
            <button>
              <FontAwesomeIcon icon={faEllipsisV} />
            </button>
            <button value={`${props.id}`} onClick={getIndex}>
              <FontAwesomeIcon
                style={{ "--fa-border-color": "red" }}
                icon={faTrash}
              />
            </button>
            <button value={`${props.indexvalue}`} onClick={addToPin}>
              <FontAwesomeIcon
                color={props.pin ? "#c73838" : "#000000"}
                icon={faStar}
              />
            </button>
            <button value={`${props.indexvalue}`} onClick={editNote}>
              {editicon ? (
                <FontAwesomeIcon icon={faPenToSquare} />
              ) : (
                <FontAwesomeIcon icon={faCircleCheck} />
              )}
            </button>
          </div>
        </div>
        <div className="mb-1 ">
          <h2 className="text-xl font-serif underline">Title:-</h2>
         { editicon ?<input
            className="my-1 rounded-md border border-black focus:border-blue-600 focus:border-[2px]  focus:outline-none h-10 w-full p-2"
            value={props.title}
            disabled={titledisable}
          />:<input
          className="my-1 rounded-md border border-black focus:border-blue-600 focus:border-[2px]  focus:outline-none h-10 w-full p-2"
          value={notetitle}
          disabled={titledisable}
          onChange={(e) => setNotetitle(e.target.value)}
        />}
        </div>
        <div>
          <h2 className="text-xl font-serif underline">Description:-</h2>
          <div>
            {editicon?<textarea
              className="my-1 rounded-md border border-black focus:border-blue-600 focus:border-[2px]  focus:outline-none w-full h-[95px] p-2 resize-none"
              disabled={titledisable}
              value={props.description}
            />:<textarea
            className="my-1 rounded-md border border-black focus:border-blue-600 focus:border-[2px]  focus:outline-none w-full h-[95px] p-2 resize-none"
            disabled={titledisable}
            value={notedescription}
            onChange={(e) => setNoteDescription(e.target.value)}
          />}
          </div>
        </div>
      </div>
  );
};

export default StickyNoteCard;
