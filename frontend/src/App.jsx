import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer';

export default function App() {
  return (
    <div>
      <Toaster position='top-center' />
      <Outlet />
      <Footer />
    </div>
  );
}
