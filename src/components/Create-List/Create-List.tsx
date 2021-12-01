import React, { FC } from "react";
import { ListProps } from "../types/types";

const CreateList: FC<ListProps> = ({ tree, rollItem }) => {
  return (
    <>
      {tree.map((e) => {
        const { id, isRoled, name } = e.data;

        if (e.children.length > 0) {
          if (id !== 0) {
            return (
              <li key={id + "li"}>
                <span id={id.toString()} onClick={(e) => {
                    const target = e.currentTarget as Element;
                    rollItem(+target.id);
                  }}
                >
                  <span className={isRoled ? undefined : "list-item"}>
                    {">"}
                  </span>
                  {name}
                </span>
                {isRoled ? null : (
                  <ul key={id + "ul"}>
                    <CreateList tree={e.children} rollItem={rollItem} />
                  </ul>
                )}
              </li>
            );
          } else {
            return (
              <ul key={id + "ul"}>
                <CreateList tree={e.children} rollItem={rollItem} />
              </ul>
            );
          }
        } else {
          return (
            <li key={id + "li"}>
              <span>{name}</span>
            </li>
          );
        }
      })}
    </>
  );
};

export default CreateList;
