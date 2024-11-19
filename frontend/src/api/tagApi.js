import axios from '../utils/Axios';

const createTag = async ({ id, body }) => {
  try {
    const { data } = await axios.post(`/todo/create-tag/${id}`, body);
    return data;
  } catch (error) {
    throw error?.response?.data;
  }
};

const updateTag = async ({ todoId, tagId, body }) => {
  try {
    const { data } = await axios.put(
      `/todo/update-tag/${todoId}/${tagId}`,
      body
    );

    return data;
  } catch (error) {
    throw error?.response?.data;
  }
};
const deleteTag = async ({ todoId, tagId }) => {
  try {
    const { data } = await axios.delete(`/todo/delete-tag/${todoId}/${tagId}`);
    return data;
  } catch (error) {
    throw error?.response?.data;
  }
};

export { createTag, updateTag, deleteTag };
