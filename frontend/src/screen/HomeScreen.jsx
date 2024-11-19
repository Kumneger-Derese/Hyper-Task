import Cta from '../components/Cta';
import FAQ from '../components/Faq';
import Features from '../components/Features';
import Hero from '../components/Hero';
import HomeNavbar from '../components/HomeNavbar';
import Services from '../components/Services';
import Tagline from '../components/Tagline';

const HomeScreen = () => {
  return (
    <div>
      <HomeNavbar />
      <Hero />
      <Features />
      <Services />
      <Tagline />
      <FAQ />
      <Cta />
    </div>
  );
};
export default HomeScreen;
