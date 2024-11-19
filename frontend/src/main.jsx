import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import { Provider } from 'react-redux';

import App from './App.jsx';
import './index.css';
import ErrorPage from './ErrorPage.jsx';
import RegisterScreen from './screen/RegisterScreen.jsx';
import LoginScreen from './screen/LoginScreen.jsx';
import ProfileScreen from './screen/ProfileScreen.jsx';
import store from './app/store.js';
import HomeScreen from './screen/HomeScreen.jsx';
import CreateTodo from './todo/CreateTodo.jsx';
import TodoList from './todo/TodoList.jsx';
import EditTodo from './todo/EditTodo.jsx';
import Todos from './todo/Todos.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Todo from './todo/Todo.jsx';

const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={'/'} element={<App />} errorElement={<ErrorPage />}>
      <Route index element={<HomeScreen />}></Route>
      <Route path='/register' element={<RegisterScreen />}></Route>
      <Route path='/login' element={<LoginScreen />}></Route>
      <Route path='/profile' element={<ProfileScreen />}></Route>

      <Route element={<ProtectedRoute />}>
        <Route path='/create-todo' element={<CreateTodo />}></Route>
        <Route path='/todos-list' element={<TodoList />}></Route>
        <Route path='/todos' element={<Todos />}></Route>
        <Route path='/todo/:id' element={<Todo />}></Route>
        <Route path='/update/:id' element={<EditTodo />}></Route>
      </Route>
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
