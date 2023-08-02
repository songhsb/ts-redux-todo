import Todo from "../../interfaces/Todo";
import { nanoid } from "nanoid";

const ADD_TODO = "todos/ADD_TODO" as const;
const DEL_TODO = "todos/DEL_TODO" as const;
const DONE_TODO = "todos/DONE_TODO" as const;

export const addTodo = (payload: Todo) => {
  return { type: ADD_TODO, payload };
};

export const delTodo = (payload: string) => {
  return { type: DEL_TODO, payload };
};

export const doneTodo = (payload: string) => {
  return { type: DONE_TODO, payload };
};

type TodoAction =
  | ReturnType<typeof addTodo>
  | ReturnType<typeof delTodo>
  | ReturnType<typeof doneTodo>;

const initialState: Todo[] = [
  {
    id: nanoid(),
    title: "리액트 강의보기",
    body: "챕터 1부터 챕터 12까지 학습",
    isDone: false,
  },
];

const todos = (state: Todo[] = initialState, action: TodoAction) => {
  switch (action.type) {
    case ADD_TODO:
      return [...state, action.payload];
    case DEL_TODO:
      const deletTodo = state.filter((todo) => todo.id !== action.payload);
      return deletTodo;
    case DONE_TODO:
      const isDoneTodo = state.map((todo) => {
        if (todo.id === action.payload) {
          return { ...todo, isDone: !todo.isDone };
        } else {
          return todo;
        }
      });
      return isDoneTodo;
    default:
      return state;
  }
};

export default todos;
