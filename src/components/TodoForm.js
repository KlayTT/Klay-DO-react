import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { completeTodo, createTodo } from '../api/data/todoData';

const InputFormStyle = styled.form`
  display: flex;
  width: 30rem;
  margin: 0.5rem;
  background-color: black;
  border: 2px solid aqua;
  padding: 10px;
  border-radius: 25px;
  color: aqua;
  justify-content: space-between;
`;

const YaDoStyle = styled.h2`
  display: flex;
  font-size: 45px;
  margin: 0.5rem;
  color: aqua;
`;

const P = styled.p`
  margin: 2rem 0;
`;

const Input = styled.input`
  border: 2px solid aqua;
  border-radius: 25px;
  background-color: white;
  width: 23rem;
`;

const initialState = {
  name: '',
  complete: false,
  uid: '',
};

export default function ToDoForm({ obj, setTodos, setEditItem }) {
  const [formInput, setFormInput] = useState(initialState);

  const handleChange = (e) => {
    setFormInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  useEffect(() => {
    if (obj.firebaseKey) {
      setFormInput({
        name: obj.name,
        firebaseKey: obj.firebaseKey,
        complete: obj.complete,
        date: obj.date,
        uid: obj.uid,
      });
    }
  }, [obj]);

  const resetForm = () => {
    setFormInput({ ...initialState });
    setEditItem({});
  };

  const handleSudmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      completeTodo(formInput).then((todos) => {
        setTodos(todos);
        resetForm();
      });
    } else {
      createTodo({ ...formInput, date: new Date() }).then((todos) => {
        setTodos(todos);
        resetForm();
      });
    }
  };

  return (
    <>
      <YaDoStyle>
        YA DO THA DO
        <P />
      </YaDoStyle>
      <P />
      <InputFormStyle onSubmit={handleSudmit}>
        <Input
          name="name"
          id="name"
          value={formInput.name}
          onChange={handleChange}
          required
          placeholder="  YA DO"
        />
        <button type="submit" className="btn btn-info">
          {obj.firebaseKey ? 'Update' : 'Submit'}
        </button>
      </InputFormStyle>
      <P />
    </>
  );
}

ToDoForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
    complete: PropTypes.bool,
    date: PropTypes.string,
    uid: PropTypes.string,
  }),
  setTodos: PropTypes.func.isRequired,
  setEditItem: PropTypes.func.isRequired,
};

ToDoForm.defaultProps = { obj: {} };
