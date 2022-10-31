import { useState, useReducer, useEffect } from "react";
import Item from "./components/Item";
import Circle from "./components/Circle";
import "./styles.css";

export const ACTION = {
  CLEAR: "",
  ADD_ITEM: "add-item",
  DELETE_ITEM: "delete-item",
  TOGGLE: "toggle",
  SAVE: "save",
  LOAD: "load",
  COOKIE: "today_tasks"
};

function reducer(items, action) {
  switch (action.type) {
    case ACTION.ADD_ITEM:
      console.log(items.length);
      return [...items, addItem(action.payload.item)];

    case ACTION.TOGGLE:
      return items.map((item) => {
        if (item.id === action.payload.id)
          return { ...item, complete: !item.complete };
        else return item;
      });

    case ACTION.DELETE_ITEM:
      return items.filter((item) => item.id !== action.payload.id);

    case ACTION.SAVE:
      localStorage.setItem(ACTION.COOKIE, JSON.stringify(items));
      return items;

    case ACTION.LOAD:
      const initial = JSON.parse(localStorage.getItem(ACTION.COOKIE));
      //console.log(initial);
      return initial;

    default:
      return items;
  }
}

function addItem(item) {
  return { id: Date.now(), item: item, complete: false };
}

export default function App() {
  const [todoList, dispatch] = useReducer(reducer, []);
  const [item, setItem] = useState("");

  useEffect(() => {
    //localStorage.removeItem(ACTION.COOKIE);
    if (localStorage.getItem(ACTION.COOKIE) !== null) {
      dispatch({ type: ACTION.LOAD });
    }
  }, []);

  function calculatePercentage(items) {
    console.log(items);
    const complete = items.filter((item) => item.complete === true);
    const completed = Math.floor((complete.length * 100) / items.length);
    if (isNaN(completed)) return 0;
    return completed;
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: ACTION.ADD_ITEM, payload: { item: item } });
    dispatch({ type: ACTION.SAVE });
    setItem(ACTION.CLEAR);
  }
  return (
    <div className="App">
      <header>
        <h1>Welcome!</h1>
        <div className="todaystasks">
          <h2>Today's tasks</h2>
          <Circle deg={calculatePercentage(todoList)} />
        </div>
      </header>
      <section>
        {todoList.map((todo) => {
          return <Item key={todo.id} todo={todo} dispatch={dispatch} />;
        })}
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Type a task & press enter"
            type="text"
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
        </form>
      </section>
    </div>
  );
}
