import { Routes, Route } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import LandingPage from '../LandingPage';
import About from '../public/About';
import Contact from '../public/Contact';
import Services from '../public/Services';
import Doctors from '../public/Doctors';
import Locations from '../public/Locations';
import Careers from '../public/Careers';
import Patients from '../public/Patients';
import News from '../public/News';
import NotFound from '../NotFound';

const PublicRoutes = () => {
    return (
        <Routes>
            <Route element={<PublicLayout />}>
                <Route index element={<LandingPage />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="services" element={<Services />} />
                <Route path="doctors" element={<Doctors />} />
                <Route path="locations" element={<Locations />} />
                <Route path="careers" element={<Careers />} />
                <Route path="patients" element={<Patients />} />
                <Route path="news" element={<News />} />
                
                <Route path="records" element={<Patients />} />
                <Route path="appointments" element={<Contact />} /> 

                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
};

export default PublicRoutes;
