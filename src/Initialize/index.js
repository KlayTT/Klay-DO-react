import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getTodos } from '../api/data/todoData';
import Todo from '../components/Todo';
import ToDoForm from '../components/TodoForm';

const TheBigToDoFormStyle = styled.div`
  margin-top: 5rem;
  margin-left: 10rem;
  justify-content: space-between;
`;

function Initialize() {
  const [todos, setTodos] = useState([]);
  const [editItem, setEditItem] = useState({});

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  return (
    <TheBigToDoFormStyle>
      <ToDoForm obj={editItem} setTodos={setTodos} setEditItem={setEditItem} />
      {todos.map((todo) => (
        <Todo
          key={todo.firebaseKey}
          todo={todo}
          setTodos={setTodos}
          setEditItem={setEditItem}
        />
      ))}
    </TheBigToDoFormStyle>
  );
}

export default Initialize;
