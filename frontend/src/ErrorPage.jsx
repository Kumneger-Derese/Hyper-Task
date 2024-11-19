import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className='bg-red-800 h-screen text-white flex flex-col justify-center items-center'>
      <h1 className='font-bold  mb-4 text-6xl'>Oops!</h1>
      <p className='font-bold text-xl'>
        Sorry, an unexpected error has occurred.
      </p>
      <p>
        <i className='text-white'>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
