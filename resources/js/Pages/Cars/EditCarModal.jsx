import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import PrimaryButton from '@/Components/PrimaryButton';

const EditCarModal = ({ car, onSave, onClose }) => {
    const [editedCar, setEditedCar] = useState(car);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedCar({ ...editedCar, [name]: value });
    };

    const handleSubmit = () => {
        if (isNaN(parseFloat(editedCar.price))) {
            // Display error message or handle invalid input
            console.error('Invalid price entered');
            return; // Prevent form submission
        }
        // Call the onSave function with the edited car data
        onSave(editedCar);
        // Close the modal
        onClose();
    };

    return (
        <Transition appear show={true} as={React.Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-10 overflow-y-auto"
                onClose={onClose}
            >
                <div className="min-h-screen px-4 text-center">
                    <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

                    <Transition.Child
                        as={React.Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <div className="inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <h3 className="text-lg font-medium leading-6 text-gray-900">Edit Car</h3>
                                <div className="mt-2">
                                    <form onSubmit={handleSubmit}>
                                        <div>
                                            <label htmlFor="make" className="block text-sm font-medium text-gray-700">Make</label>
                                            <input type="text" id="make" name="make" value={editedCar.make} onChange={handleInputChange} className="mt-1 p-2 w-full border rounded-md" />
                                        </div>
                                        <div>
                                            <label htmlFor="model" className="block text-sm font-medium text-gray-700">Model</label>
                                            <input type="text" id="model" name="model" value={editedCar.model} onChange={handleInputChange} className="mt-1 p-2 w-full border rounded-md" />
                                        </div>
                                        <div>
                                            <label htmlFor="year" className="block text-sm font-medium text-gray-700">Year</label>
                                            <input type="text" id="year" name="year" value={editedCar.year} onChange={handleInputChange} className="mt-1 p-2 w-full border rounded-md" />
                                        </div>
                                        <div>
                                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                                            <input type="text" id="price" name="price" value={editedCar.price} onChange={handleInputChange} className=" mt-1 p-2 w-full border rounded-md" />
                                        </div>
                                        <PrimaryButton type="submit" className='my-2'>
                                            Save
                                        </PrimaryButton>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
};

export default EditCarModal;
