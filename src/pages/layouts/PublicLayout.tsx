
import { Outlet } from 'react-router-dom';
import Footer from '../../components/footer/Footer';
import Navbar from '../../components/navbar/Navbar';

const PublicLayout = () => {

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar/>
      <main className="flex-1 w-full relative">
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
};

export default PublicLayout;
