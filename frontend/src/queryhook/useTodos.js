import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  completeTodo,
  createTodo,
  deleteTodo,
  editTodo,
  getTodo,
  getTodos,
} from '../api/todoApi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const useTodos = (id = '') => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  //* Get one todo by id
  const {
    data: todo,
    isLoading: isTodoLoading,
    isPending: isTodoPending,
  } = useQuery({
    queryKey: ['Todo', id],
    queryFn: () => getTodo(id),
    retry: 0,
  });

  //* get all todos
  const {
    data: todos,
    isError: isTodosError,
    error: todosError,
    isLoading: isTodosPending,
  } = useQuery({
    queryKey: ['Todo'],
    queryFn: getTodos,
  });

  //* create todo
  const createTodoMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      navigate('/todos');
      queryClient.invalidateQueries({ queryKey: ['Todo'] });
      toast.success('Todo created');
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  //* edit todo
  const editTodoMutation = useMutation({
    mutationFn: editTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Todo', id] });
      toast.success('Todo updated.');
      navigate('/todos');
    },
  });

  //* Toggle todo status
  const completeTodoMutation = useMutation({
    mutationFn: completeTodo,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['Todo', id] });
      toast.success(data);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  //delete todo
  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Todo', id] });
      toast.success('Todo deleted');
      navigate('/todos');
    },
  });

  return {
    todo,
    isTodoLoading,
    isTodoPending,
    todos,
    isTodosError,
    todosError,
    isTodosPending,
    completeTodoMutation,
    editTodoMutation,
    createTodoMutation,
    deleteTodoMutation,
  };
};

export default useTodos;
