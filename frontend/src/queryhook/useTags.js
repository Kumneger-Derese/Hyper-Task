import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createTag, deleteTag, updateTag } from '../api/tagApi';

const useTags = (id) => {
  const queryClient = useQueryClient();

  //create tag
  const createTagMutation = useMutation({
    mutationFn: createTag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Todo', id] });
      toast.success('Todo tag created.');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  //delete tag
  const deleteTagMutation = useMutation({
    mutationFn: deleteTag,
    onSuccess: () => {
      toast.success('Tag deleted.');
      queryClient.invalidateQueries({ queryKey: ['Todo', id] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  //update tag
  const updateTagMutation = useMutation({
    mutationFn: updateTag,
    onSuccess: () => {
      toast.success('Tag updated.');
      queryClient.invalidateQueries({ queryKey: ['Todo', id] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { createTagMutation, updateTagMutation, deleteTagMutation };
};
export default useTags;
