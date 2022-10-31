import { ACTION } from "../App";

export default function Item({ todo, dispatch }) {
  return (
    <div draggable className="item">
      <span
        className={todo.complete ? "icon complete" : "icon incomplete"}
        onClick={() => {
          dispatch({ type: ACTION.TOGGLE, payload: { id: todo.id } });
          dispatch({ type: ACTION.SAVE });
        }}
        style={{ color: "#777" }}
      ></span>
      <span className={todo.complete ? "caption complete" : "caption"}>
        {todo.item}
      </span>
      <span
        className="icon delete"
        onClick={() => {
          dispatch({ type: ACTION.DELETE_ITEM, payload: { id: todo.id } });
          dispatch({ type: ACTION.SAVE });
        }}
        style={{ color: "red" }}
      ></span>
    </div>
  );
}
