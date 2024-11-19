const Footer = () => {
  return (
    <div
      id='contact'
      className='scroll-m-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 font-semibold min-h-48 bg-white/15 p-8 pt-12'
    >
      <div>
        <a
          href='#hero'
          className='font-bold text-2xl sm:text-4xl mb-1 text-[orangered]'
        >
          Hyper<span className='text-white'>Task</span>{' '}
        </a>
        <p className='font-bold mb-4'>@2024</p>
        <img
          src='/dots.png'
          className=' w-12 bottom-0 left-8'
          alt='hero image'
        />
      </div>
      <div>
        <h3>Blog Posts</h3>
        <h3>Releases</h3>
        <h3>Forums</h3>
      </div>
      <div>
        <h3>LinkedIn</h3>
        <h3>TikTok</h3>
        <h3>Phone</h3>
      </div>
      <div>
        <h3>Facebook</h3>
        <h3>Instagram</h3>
        <h3>X</h3>
      </div>
    </div>
  );
};
export default Footer;
