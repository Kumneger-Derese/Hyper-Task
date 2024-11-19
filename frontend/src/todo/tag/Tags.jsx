import { useState } from 'react';
import Modal from '../../components/Modal';
import { MdModeEdit } from 'react-icons/md';
import useTags from '../../queryhook/useTags';

const Tags = ({ tags, todoId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [name, setName] = useState();
  const [color, setColor] = useState();
  const [selectedTag, setSelectedTag] = useState();

  //* Tag Hooks
  const { deleteTagMutation, updateTagMutation } = useTags(todoId);

  //* Event handlers
  const handleDeleteTag = async (todoId, tagId) => {
    await deleteTagMutation.mutateAsync({ todoId, tagId });
    closeDeleteModal();
  };

  const handleUpdateTag = async () => {
    await updateTagMutation.mutateAsync({
      todoId,
      tagId: selectedTag._id,
      body: { name, color },
    });
    closeModal();
  };

  const openModal = (tag) => {
    setSelectedTag(tag);
    setName(tag.name || '');
    setColor(tag.color || '');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTag(null);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
    closeModal();
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <div>
      <h2 className='font-bold text-2xl text-neutral-300 mb-4'>Tags</h2>
      <section className='flex flex-wrap gap-2'>
        {tags?.map((tag) => (
          <div
            key={tag._id}
            className={`border text-${tag.color}-500 border-primary py-1 px-3 rounded-lg w-fit`}
          >
            <button
              onClick={() => openModal(tag)}
              data-tip='Edit Tag'
              className='btn btn-ghost flex items-center btn-sm tooltip tooltip-primary'
            >
              <span>
                <MdModeEdit />
              </span>
              {tag.name}
            </button>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
              <div className={`flex flex-col gap-x-8 gap-y-2 w-full`}>
                {/*Color input*/}

                <label
                  htmlFor='tagname'
                  className='block text-xl font-bold mb-2'
                >
                  Tagname
                </label>
                <input
                  type='text'
                  id='tagname'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className='input input-bordered border-2 bg-transparent border-lime-500 focus:border-lime-400'
                />
                {/*Color input*/}
                <label htmlFor='color' className='block text-xl font-bold mb-2'>
                  Tag color:
                </label>
                <input
                  type='text'
                  id='color'
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className={`input  input-bordered border-2 bg-transparent border-lime-500 focus:border-lime-400`}
                />

                {/*Tag Modal Action button*/}
                <div className='flex justify-between gap-x-4 items-baseline'>
                  <button
                    onClick={handleUpdateTag}
                    className='btn btn-md btn-warn mb-2 mt-8'
                  >
                    Update Tag
                  </button>

                  <button
                    onClick={openDeleteModal}
                    className='btn btn-md btn-error'
                  >
                    Delete Tag
                  </button>
                </div>
              </div>
            </Modal>

            {/*Delete Modal*/}
            <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal}>
              <p className='font-bold text-gray-300 text-2xl '>
                Are you sure you want to delete this tag?
              </p>
              <div className='flex gap-x-8 mt-8'>
                <button
                  className='btn btn-md px-6 btn-warning'
                  onClick={closeDeleteModal}
                >
                  Cancel
                </button>
                <button
                  className='btn btn-md px-6 btn-error'
                  onClick={() => handleDeleteTag(todoId, tag._id)}
                >
                  Delete
                </button>
              </div>
            </Modal>
          </div>
        ))}
      </section>
    </div>
  );
};
export default Tags;
