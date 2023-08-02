import React from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { RootState } from "../redux/config/configStore";
import Todo from "../interfaces/Todo";
import styled from "styled-components";

function Detail() {
  const param = useParams();
  const navigate = useNavigate();
  const todos: Todo[] = useSelector((state: RootState) => state.todos);

  const todo = todos.find((todo) => {
    return todo.id === param.id;
  });

  return (
    <StLayout>
      {todo ? (
        <>
          <p>ID: {todo.id}</p>
          <p>{todo.title}</p>
          <p>{todo.body}</p>
        </>
      ) : (
        <p>잘못된 주소입니다.</p>
      )}
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        이전으로
      </button>
    </StLayout>
  );
}

const StLayout = styled.div`
  max-width: 1200px;
  min-width: 800px;
  margin: 0 auto;
`;

export default Detail;
