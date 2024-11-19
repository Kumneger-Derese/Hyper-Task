import axios from '../utils/Axios';

const createTodo = async (body) => {
  try {
    const { data } = await axios.post('/todo/create', body);
    return data;
  } catch (error) {
    throw error?.response?.data;
  }
};

const completeTodo = async (todoId) => {
  try {
    const { data } = await axios.patch(`/todo/complete/${todoId}`, {});
    return data;
  } catch (error) {
    throw error?.response?.data;
  }
};

const editTodo = async ({ id, body }) => {
  try {
    const { data } = await axios.put(`/todo/update/${id}`, body);
    return data;
  } catch (error) {
    throw error?.response?.data;
  }
};

const getTodo = async (id) => {
  try {
    const { data } = await axios.get(`/todo/get-todo/${id}`);
    return data;
  } catch (error) {
    throw error?.response?.data;
  }
};

const getTodos = async () => {
  try {
    const { data } = await axios.get('/todo/get-todos');
    return data;
  } catch (error) {
    throw error?.response?.data;
  }
};

const deleteTodo = async (id) => {
  try {
    const { data } = await axios.delete(`/todo/delete/${id}`);
    return data;
  } catch (error) {
    throw error?.response?.data;
  }
};

export { createTodo, completeTodo, editTodo, getTodos, getTodo, deleteTodo };
