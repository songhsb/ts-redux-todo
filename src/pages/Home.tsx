import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addTodo, delTodo, doneTodo } from "../redux/modules/todos";
import Todo from "../interfaces/Todo";
import { nanoid } from "nanoid";
import styled from "styled-components";
import { RootState } from "../redux/config/configStore";

function Home() {
  const dispatch = useDispatch();

  const todos: Todo[] = useSelector((state: RootState) => state.todos);
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");

  const onChangeTitle = (event: React.FormEvent<HTMLInputElement>): void => {
    const {
      currentTarget: { value },
    } = event;
    setTitle(value);
  };

  const onChangeBody = (event: React.FormEvent<HTMLInputElement>): void => {
    const {
      currentTarget: { value },
    } = event;
    setBody(value);
  };

  const resetInput = (): void => {
    setTitle("");
    setBody("");
  };

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!(title && body)) {
      return;
    }
    const newTodo: Todo = {
      id: nanoid(),
      title,
      body,
      isDone: false,
    };
    dispatch(addTodo(newTodo));
    resetInput();
  };

  return (
    <StLayout>
      <StHeader>
        <h1>헤더입니다.</h1>
      </StHeader>
      <main>
        <form onSubmit={onSubmitHandler}>
          <label>제목</label>
          <input type="text" value={title} onChange={onChangeTitle} />
          <label>내용</label>
          <input type="text" value={body} onChange={onChangeBody} />
          <button type="submit">추가하기</button>
        </form>
        <section>
          <h2>working</h2>
          {todos
            .filter((todo) => {
              return todo.isDone === false;
            })
            .map((todo) => {
              return (
                <StTodo key={todo.id}>
                  <Link to={`/detail/${todo.id}`}>상세보기</Link>
                  <h3>{todo.title}</h3>
                  <p>{todo.body}</p>
                  <div>
                    <button
                      onClick={() => {
                        dispatch(delTodo(todo.id));
                      }}
                    >
                      삭제
                    </button>
                    <button
                      onClick={() => {
                        dispatch(doneTodo(todo.id));
                      }}
                    >
                      {todo.isDone ? "취소" : "완료"}
                    </button>
                  </div>
                </StTodo>
              );
            })}
          <h2>done</h2>
          {todos
            .filter((todo) => {
              return todo.isDone === true;
            })
            .map((todo) => {
              return (
                <StTodo key={todo.id}>
                  <Link to={`/detail/${todo.id}`}>상세보기</Link>
                  <h3>{todo.title}</h3>
                  <p>{todo.body}</p>
                  <div>
                    <button
                      onClick={() => {
                        dispatch(delTodo(todo.id));
                      }}
                    >
                      삭제
                    </button>
                    <button
                      onClick={() => {
                        dispatch(doneTodo(todo.id));
                      }}
                    >
                      {todo.isDone ? "취소" : "완료"}
                    </button>
                  </div>
                </StTodo>
              );
            })}
        </section>
      </main>
      <StFooter>푸터입니다.</StFooter>
    </StLayout>
  );
}

const StLayout = styled.div`
  max-width: 1200px;
  min-width: 800px;
  margin: 0 auto;
`;

const StHeader = styled.header`
  background-color: gray;
  padding: 20px;
`;

const StFooter = styled.footer`
  background-color: gray;
  padding: 20px;
`;

const StTodo = styled.div`
  background-color: green;
  border-radius: 10px;
  margin: 10px;
  padding: 20px;
`;

export default Home;
