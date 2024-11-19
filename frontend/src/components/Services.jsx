import { services } from '../constant/constant';

const Services = () => {
  return (
    <div className=' my-24 mx-8 relative scroll-m-12' id='service'>
      <h1 className='text-3xl lg:text-4xl mb-12 font-bold text-center py-8 text-primary'>
        Services We Offer.
      </h1>

      <img
        src='/dots.png'
        className='absolute top-20 left-12 md:left-24'
        alt='dots'
      />

      {/* Section Container */}
      <div className='flex flex-col lg:flex-row p-8 gap-16 items-center justify-center  rounded-md'>
        {/* Left Section | image*/}
        <section className='relative flex items-center justify-center w-full md:w-1/2'>
          <img
            src='/server.png'
            className='w-[70%] sm:w-[80%] lg:w-[70%]'
            alt='server image'
          />

          <img
            src='/dots.png'
            className='absolute bottom-0 right-0'
            alt='dots'
          />
        </section>

        {/* Right Section | service */}
        <section className='flex w-full justify-center md:w-1/2'>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
            {services.map((service) => (
              <div
                key={service.id}
                className='card min-w-48 min-h-48 justify-end rounded p-4 bg-white hover:bg-primary hover:-skew-x-1 duration-200 transition text-base-300'
              >
                <h1 className='font-bold text-2xl self-start hover:translate-x-2 duration-150'>
                  {service.title}
                </h1>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
export default Services;
