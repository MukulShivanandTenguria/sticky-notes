import React, { createContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEllipsisV,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

const CardIdProvider = createContext();

const StickyNoteCard = (props) => {
  const [pincolor, setPinColor] = useState("#000000");
  const [cardid, setCardId] = useState(null);
  const getIndex = (e) => {
    const { value } = e.currentTarget;
    console.log(e.currentTarget.value);
    setCardId(value);
    props.handleOnDeleteItem(value);
  };

  const addToPin = (e) => {
    const { value } = e.currentTarget;
    props.handleOnPinItem(value)
    if(pincolor==="#c73838"){
      setPinColor("#000000")
    }else{
      setPinColor("#c73838")
    }

  };

  return (
    <CardIdProvider.Provider value={cardid}>
      <div className="p-10 mb-10">
        <div className="w-72 h-72 bg-gray-100 inline-flex flex-col p-3 shadow-md rounded ring-1 ring-gray-200">
          <div className="flex justify-between">
            <div>
              <h2 className="text-2xl">Note:-</h2>
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
              <button value={`${props.pinindex}`} onClick={addToPin}>
                <FontAwesomeIcon
                  color={pincolor}
                  icon={faStar}
                />
              </button>
              <button></button>
            </div>
          </div>
          <div className="mb-1 ">
            <h2 className="text-xl">Title:-</h2>
            <input
              value={props.title}
              className="my-1 rounded-md border border-black focus:border-blue-600 focus:border-[2px]  focus:outline-none h-10 w-64 p-2"
            />
          </div>
          <hr className="h-2" />
          <div>
            <h2 className="text-xl">Description:-</h2>
            <div>
              <textarea
                value={props.description}
                className="my-1 rounded-md border border-black focus:border-blue-600 focus:border-[2px]  focus:outline-none w-64 h-[95px] p-2 resize-none"
                disabled={false}
              />
            </div>
          </div>
        </div>
      </div>
    </CardIdProvider.Provider>
  );
};

export default StickyNoteCard;

export { CardIdProvider };
