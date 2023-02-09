import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEllipsisV,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

const StickyNoteCard = (props) => {
  const [editicon, setEditIcon] = useState(true);
  const [titledisable, setTitleDisable] = useState(true);
  const [notetitle, setNotetitle] = useState(props.title);
  const [notedescription, setNoteDescription] = useState(props.description);
  const [visibile, setVisible] = useState("hidden");
  const [cardcolor, setCardColor] = useState("bg-yellow-100");
  const [bordercolor, setBorderColor] = useState("border-yellow-100");
  // const ref = useRef();

  const getNoteId = (e) => {
    const { value } = e.currentTarget;
    let data = JSON.parse(localStorage.getItem("listData"));
    data = data.filter((item) => {
      return item.id !== value;
    });
    localStorage.setItem("listData", JSON.stringify(data));
    // props.setNoteList([...data]);
    // props.handleOnDeleteItem(data);
    window.location.reload();
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
    // props.setNoteList([...data]);
    props.setMessagePosition("0px");
    setTimeout(() => {
      props.setMessagePosition("-70px");
    }, 2000);
  };

  const showColorAlternative = () => {
    if (visibile === "hidden") {
      setVisible("visible");
    } else {
      setVisible("hidden");
    }
  };

  const hideColorAlternative = () => {
    setVisible("hidden");
  };

  const changeCardColor = (e) => {
    const { value } = e.currentTarget;
    setCardColor(value);
  };

  return (
    // <div className="bg-blue-100">
    <div className={cardcolor}>
      <div
        onMouseLeave={hideColorAlternative}
        className=" group w-60 h-56   flex-col p-3 shadow-md rounded ring-1 ring-gray-200"
      >
        <div className="flex justify-end">
          <div className="flex items-center" style={{ visibility: visibile }}>
            <button
              value="bg-orange-100"
              className="bg-orange-100 border border-black p-2 my-auto rounded-3xl mx-1"
              onClick={changeCardColor}
            ></button>
            <button
              value="bg-blue-100"
              className="bg-blue-100 border border-black p-2 my-auto rounded-3xl mx-1"
              onClick={changeCardColor}
            ></button>
            <button
              value="bg-red-100"
              className="bg-red-100 border border-black p-2 my-auto rounded-3xl mx-1"
              onClick={changeCardColor}
            ></button>
            <button
              value="bg-yellow-100"
              className="bg-yellow-100 border border-black p-2 my-auto rounded-3xl mx-1"
              onClick={changeCardColor}
            ></button>
          </div>
          <div className="space-x-2 invisible group/item group-hoveritem:visible group-hover:visible">
            <button
              className="group-[color]:"
              onClick={showColorAlternative}
              // onMouseLeave={hideColor}
            >
              <FontAwesomeIcon color="#ff0000" icon={faEllipsisV} />
            </button>
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
            className={`my-1 rounded-md  ${cardcolor}  font-bold  focus:border-orange-800 focus:border-[2px]  focus:outline-none h-10 w-full p-2`}
            value={notetitle}
            onChange={(e) => setNotetitle(e.target.value)}
          />
        </div>
        <div>
          <div>
            <textarea
              className={`my-1 rounded-md  ${cardcolor}   focus:border-orange-800  focus:border-[2px]  focus:outline-none w-full h-[95px] p-2 resize-none`}
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
    </div>
  );
};

export default StickyNoteCard;
