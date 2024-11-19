import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  completeSubtask,
  createSubtask,
  deleteSubTask,
  updateSubtask,
} from '../api/subTaskApi';
import toast from 'react-hot-toast';

const useSubtasks = (id) => {
  const queryClient = useQueryClient();

  //create subtask
  const createSubtaskMutation = useMutation({
    mutationFn: createSubtask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Todo', id] });
      toast.success('Todo subtask created.');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  //update subtask
  const updateSubtaskMutation = useMutation({
    mutationFn: updateSubtask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Todo', id] });
      toast.success('subtask updated.');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  //toggle subtask state
  const completeSubtaskMutation = useMutation({
    mutationFn: completeSubtask,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['Todo', id] });
      toast.success(data);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  //delete subtask
  const deleteSubtaskMutation = useMutation({
    mutationFn: deleteSubTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Todo', id] });
      toast.success('subtask deleted.');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    createSubtaskMutation,
    updateSubtaskMutation,
    completeSubtaskMutation,
    deleteSubtaskMutation,
  };
};
export default useSubtasks;
