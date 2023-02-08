import React, { useEffect, useRef, useState } from "react";
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
  const [notetitle, setNotetitle] = useState(props.title);
  const [notedescription, setNoteDescription] = useState(props.description);
  // const ref = useRef();


  const getNoteId =async (e) => {
    const { value } =await e.currentTarget;
    let data = JSON.parse(localStorage.getItem("listData"));
    data = await data.filter((item) => {
      return item.id !== value;
    });
    localStorage.setItem("listData", JSON.stringify(data));
    props.setNoteList([...data]);
    // props.handleOnDeleteItem(value);
    window.location.reload()
  };
  

  const addToPin = (e) => {
    const { value } = e.currentTarget;
    props.handleOnPinItem(value);
  };

  const editNote = (e) => {
    const { value } = e.currentTarget;
    let data = JSON.parse(localStorage.getItem("listData"));
    data[props.indexvalue].notetitle = notetitle;
    data[props.indexvalue].notedescription = notedescription;
    localStorage.setItem("listData", JSON.stringify(data));
    props.setNoteList([...data]);
    
  };
  return (
    <div className=" group w-60 h-56 bg-yellow-100  flex-col p-3 shadow-md rounded ring-1 ring-gray-200">
      <div className="flex justify-end">
        <div className="space-x-2 invisible group-hover:visible">
          <button>
            <FontAwesomeIcon color="#ff0000" icon={faEllipsisV} />
          </button>
          {/* <button value={`${props.id}`} onClick={(e)=>props.handleOnDeleteItem(e.target.value)}> */}
          <button value={`${props.id}`} onClick={getNoteId}>
            <FontAwesomeIcon color="#ff0000" icon={faTrash} />
          </button>
          <button value={`${props.indexvalue}`} onClick={addToPin}>
            <FontAwesomeIcon
              color={props.pin ? "#8B8000" : "#ff0000"}
              icon={faStar}
            />
          </button>
        </div>
      </div>
      <div className="mb-1 ">
        <input
          className="my-1 rounded-md border bg-yellow-100 font-bold border-yellow-100 focus:border-orange-800 focus:border-[2px]  focus:outline-none h-10 w-full p-2"
          value={notetitle}
          onChange={(e) => setNotetitle(e.target.value)}
        />
      </div>
      <div>
        <div>
          <textarea
            className="my-1 rounded-md border bg-yellow-100 border-yellow-100 focus:border-orange-800  focus:border-[2px]  focus:outline-none w-full h-[95px] p-2 resize-none"
            value={notedescription}
            onChange={(e) => setNoteDescription(e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-end">
        <button
          className="bg-red-700 text-white rounded w-16 invisible group-hover:visible hover:bg-red-600 "
          value={`${props.indexvalue}`}
          onClick={editNote}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default StickyNoteCard;
