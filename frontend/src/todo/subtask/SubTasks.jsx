import Modal from '../../components/Modal';
import { useState } from 'react';
import { PiNotePencilBold } from 'react-icons/pi';
import { LuCheck, LuLoader, LuPenSquare, LuTrash2 } from 'react-icons/lu';
import useSubtasks from '../../queryhook/useSubtasks';

const SubTasks = ({ subTasks, todoId }) => {
  const [title, setTitle] = useState();
  const [selectedTask, setSelectedTask] = useState();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  //* Subtask Hook
  const {
    deleteSubtaskMutation,
    updateSubtaskMutation,
    completeSubtaskMutation,
  } = useSubtasks(todoId);

  //* Delete subtask
  const handleDeleteSubTask = async (todoId, subTodoId) => {
    await deleteSubtaskMutation.mutateAsync({ todoId, subTodoId });
    closeModal();
  };

  //* Update subtask
  const handleUpdateSubtask = async (todoId, subTodoId) => {
    await updateSubtaskMutation.mutateAsync({
      todoId,
      subTodoId,
      body: { title },
    });
    closeModal();
  };

  //* Complete subtask
  const handleCompleteSubtask = async (todoId, subTodoId) => {
    await completeSubtaskMutation.mutateAsync({ todoId, subTodoId });
  };

  const openModal = (subTask) => {
    setTitle(subTask.title || '');
    setSelectedTask(subTask._id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openDeleteModal = (subTask) => {
    setSelectedTask(subTask._id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <div className='my-12'>
      <h2 className='font-bold text-2xl text-neutral-300 mb-4'>Sub Tasks</h2>

      {/* Subtask detail */}
      {subTasks?.map((subTask) => (
        <div key={subTask._id} className={`mb-2`}>
          <div className='flex flex-col gap-y-4 items-baseline border border-slate-600 p-4 rounded-md'>
            <span className='text-primary font-semibold'>
              <span className='font-bold mr-2 text-lg text-accent'>Todo:</span>
              {subTask.title}
            </span>

            {/* Status */}
            <section className='flex gap-x-2 items-center'>
              <span className='font-bold mr-2 text-lg text-accent'>
                Status:
              </span>
              <div>
                {subTask.completed ? (
                  <span
                    onClick={() => handleCompleteSubtask(todoId, subTask._id)}
                    className='text-green-400 border cursor-pointer rounded-lg px-3 py-1 border-green-400'
                  >
                    <LuCheck className='inline-block' />
                    completed
                  </span>
                ) : (
                  <span
                    onClick={() => handleCompleteSubtask(todoId, subTask._id)}
                    className='text-blue-400 cursor-pointer border rounded-lg px-3 py-1 border-blue-400'
                  >
                    <LuLoader className='inline-block' /> on progress
                  </span>
                )}
              </div>
            </section>

            {/* Action Button */}
            <section className='flex items-center gap-8'>
              {/* update btn */}

              <button
                onClick={() => openModal(subTask)}
                className='btn btn-sm btn-warning inline'
              >
                <LuPenSquare className='inline-block' /> Edit
              </button>

              {/* Delete btn */}
              <button
                onClick={() => openDeleteModal(subTask)}
                className='btn btn-sm btn-error inline'
              >
                <LuTrash2 className='inline-block' /> Delete
              </button>
            </section>

            {/* Update Modal */}
            <Modal isOpen={isModalOpen} onClose={closeModal}>
              <label
                htmlFor='title'
                className='block text-stone-200 font-bold text-xl'
              >
                Title:
              </label>
              <input
                type='text'
                id='title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className='input input-bordered text-white bg-transparent border-2 border-primary focus:border-rose-400'
              />

              {/* Update Action Button */}
              <button
                onClick={() => handleUpdateSubtask(todoId, selectedTask)}
                className='btn btn-md btn-success min-w-1/2 mt-4 '
              >
                <PiNotePencilBold size={18} className='font-bold' />
                Update
              </button>
            </Modal>

            {/* Delete Modal */}
            <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal}>
              <p className='font-bold text-gray-300 text-2xl '>
                Are you sure you want to delete this subtask?
              </p>
              <div className='flex gap-x-8 mt-8'>
                <button
                  onClick={closeDeleteModal}
                  className='btn btn-md px-6 btn-warning'
                >
                  Cancel
                </button>

                {/* Delete Action Button */}
                <button
                  onClick={() => {
                    handleDeleteSubTask(todoId, selectedTask);
                    closeDeleteModal();
                  }}
                  className='btn btn-md px-6 btn-error'
                >
                  Delete
                </button>
              </div>
            </Modal>
          </div>
        </div>
      ))}
    </div>
  );
};
export default SubTasks;
