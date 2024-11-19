import { features } from '../constant/constant';

const Features = () => {
  return (
    <div
      className='mx-8 mb-16 mt-16 relative scroll-m-20 scroll-smooth'
      id='feature'
    >
      <h1 className='text-bold text-center text-4xl mb-16 text-primary font-bold'>
        Features
      </h1>

      <img
        src='/dots.png'
        className='absolute top-0 left-0 sm:left-12 scale-50 md:scale-100'
        alt='hero image'
      />

      <div className='grid lg:mx-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center gap-4 '>
        {features.map((feature) => (
          <div
            key={feature.id}
            className='card card-compact min-w-80 text-center text-base-300 p-4 rounded bg-gray-300'
          >
            <h1 className='card-title font-bold justify-center text-2xl'>
              {feature.title}
            </h1>
            <div className='card-body text-xl '>{feature.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Features;
