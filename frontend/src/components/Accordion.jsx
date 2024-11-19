const Accordion = ({ question, answer }) => {
  return (
    <div>
      <div className='collapse collapse-plus text-slate-100 bg-stone-600 mb-4'>
        <input type='radio' name='accordion-2' checked='checked' readOnly />
        <div className='collapse-title text-xl font-medium'>{question}</div>
        <div className='collapse-content'>
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
};
export default Accordion;
