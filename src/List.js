import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const List = ({ items, removeItem, editItem }) => {
  return (
    <div className=" mx-5 lg:mx-24  grid grid-cols-1 ">
      {items.map((item) => {
        const { id, title } = item;
        return (
          <div key={id} className=" flex justify-center">
            <div class="w-full">
              <div class=" pb-5">
                <div class="bg-[#e5e5e5] px-2 rounded-sm  flex justify-between items-center  ">
                  <span class="text-sm font-bold ">
                    <p>{title}</p>
                  </span>
                  <p class=" py-2.5 text-center   ">
                    <button
                      type="button"
                      className="edit-btn"
                      onClick={() => editItem(id)}
                    >
                      <FaEdit size={20} className="text-green-700 mx-2" />
                    </button>
                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => removeItem(id)}
                    >
                      <FaTrash size={20} className="text-red-700 mx-2" />
                    </button>
                  </p>
                </div>{" "}
                <hr />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default List;
