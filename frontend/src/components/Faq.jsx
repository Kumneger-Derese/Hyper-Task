import { faq } from '../constant/constant';
import Accordion from './Accordion';

const Faq = () => {
  return (
    <div className='my-32 relative scroll-m-20' id='faq'>
      <img src='/dots.png' className='absolute left-[40%] top-24' alt='dots' />
      <h1 className='mb-32 font-bold text-4xl text-primary text-center'>
        Frequently Asked Questions
      </h1>
      <section className='mx-8 md:mx-32 '>
        {faq.map(({ id, question, answer }) => (
          <Accordion key={id} question={question} answer={answer} />
        ))}
      </section>
    </div>
  );
};
export default Faq;
