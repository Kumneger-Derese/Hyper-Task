import axios from '../utils/Axios';

const createSubtask = async ({ id, body }) => {
  try {
    const { data } = await axios.post(`/todo/sub-todo/${id}`, body);
    return data;
  } catch (error) {
    throw error?.response?.data;
  }
};

const completeSubtask = async ({ todoId, subTodoId }) => {
  try {
    const { data } = await axios.patch(
      `/todo/complete-subtask/${todoId}/${subTodoId}`,
      {}
    );
    return data;
  } catch (error) {
    throw error?.response?.data;
  }
};

const updateSubtask = async ({ todoId, subTodoId, body }) => {
  try {
    const { data } = await axios.put(
      `/todo/sub-todo/${todoId}/${subTodoId}`,
      body
    );
    return data;
  } catch (error) {
    throw error?.response?.data;
  }
};

const deleteSubTask = async ({ todoId, subTodoId }) => {
  try {
    const { data } = await axios.delete(
      `/todo/sub-todo/${todoId}/${subTodoId}`
    );
    return data;
  } catch (error) {
    throw error?.response?.data;
  }
};

export { createSubtask, completeSubtask, deleteSubTask, updateSubtask };
