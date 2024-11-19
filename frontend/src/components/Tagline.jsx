const Tagline = () => {
  return (
    <div className='relative bg-gradient-to-br from-primary to-[orangered] flex flex-col text-base-300 items-center justify-center  min-h-72 mt-8 mb-16 m-auto'>
      <h1 className='text-center text-4xl leading-normal sm:text-5xl px-16 font-black mb-8'>
        HyperTask Made It Easy To Succeed
      </h1>
      <img
        src='/black-dots.png'
        className='absolute bottom-8 w-16 left-8 sm:w-24 sm:right-16'
        alt='hero image'
      />
    </div>
  );
};
export default Tagline;
