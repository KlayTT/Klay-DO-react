import React from 'react';
import PropTypes from 'prop-types';
// import { Alert } from 'reactstrap';
import styled from 'styled-components';
import { deleteTodo, completeTodo } from '../api/data/todoData';

const TodoStyle = styled.div`
  display: flex;
  justify-content: space-between;
  width: 30rem;
  max-height: 30rem;
  margin: 0.5rem;
  background-color: black;
  border: 2px solid aqua;
  padding: 10px;
  border-radius: 25px;

  h5 {
    flex-flow: 2;
    margin-top: 0.5px;
    color: aqua;
    justify-content: space-between;
    width: 12rem;
  }
`;
const ToDoButton = styled.div`
  flex-flox: 1;
  width: 5rem;
  height: 2rem;
  padding: 0.2px;
  margin: 2px;
  display: flex;
  justify-content: center;
`;

const P = styled.p`
  margin: 1rem 0;
`;

// const P2 = styled.p`
// margin: 2rem 0;
// `;

export default function Todo({ todo, setTodos, setEditItem }) {
  const handleClick = (method) => {
    if (method === 'delete') {
      deleteTodo(todo.firebaseKey).then(setTodos);
    } else {
      completeTodo({ ...todo, complete: true }).then(setTodos);
    }
  };

  return (
    <>
      <P />
      <TodoStyle color="light">
        <ToDoButton
          onClick={() => handleClick('complete')}
          className="btn btn-outline-info"
          type="button"
        >
          {todo.complete ? 'DONE' : 'Complete'}
          {/* {todo.complete ? (
          'Done'
        ) : (
          <button
            onClick={() => handleClick('complete')}
            className="btn btn-outline-info"
            type="button"
          >
            Complete
          </button>
        )} */}
        </ToDoButton>
        <h5>{todo.name}</h5>
        <ToDoButton
          onClick={() => setEditItem(todo)}
          className="btn btn-outline-warning"
          type="button"
        >
          Edit
        </ToDoButton>
        <ToDoButton
          onClick={() => handleClick('delete')}
          className="btn btn-outline-danger"
          type="button"
        >
          Delete
        </ToDoButton>
      </TodoStyle>
    </>
  );
}

Todo.propTypes = {
  todo: PropTypes.shape({
    name: PropTypes.string,
    complete: PropTypes.bool,
    date: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  setTodos: PropTypes.func.isRequired,
  setEditItem: PropTypes.func.isRequired,
};
