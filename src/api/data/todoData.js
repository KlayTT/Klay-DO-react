import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbURL = firebaseConfig.databaseURL;

const getTodos = () => new Promise((resolve, reject) => {
  axios
    .get(`${dbURL}/todo.json`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

const createTodo = (obj) => new Promise((resolve, reject) => {
  axios
    .post(`${dbURL}/todo.json`, obj)
    .then((response) => {
      const firebaseKey = response.data.name;
      axios
        .patch(`${dbURL}/todo/${firebaseKey}.json`, { firebaseKey })
        .then(() => {
          getTodos().then(resolve);
        });
    })
    .catch(reject);
});

const deleteTodo = (firebaseKey) => new Promise((resolve, reject) => {
  axios
    .delete(`${dbURL}/todo/${firebaseKey}.json`)
    .then(() => getTodos().then(resolve))
    .catch(reject);
});

// const completeTodo = (TodoObj, newState) => new Promise((resolve, reject) => {
//   axios.patch(`${dbURL}/todo/${TodoObj.firebaseKey}.json`, { newState })
//     .then(() => getTodos().then(resolve))
//     .catch(reject);
// });

// Dr version
const completeTodo = (TodoObj) => new Promise((resolve, reject) => {
  axios
    .patch(`${dbURL}/todo/${TodoObj.firebaseKey}.json`, TodoObj)
    .then(() => getTodos().then(resolve))
    .catch(reject);
});

export {
  getTodos, createTodo, deleteTodo, completeTodo,
};
