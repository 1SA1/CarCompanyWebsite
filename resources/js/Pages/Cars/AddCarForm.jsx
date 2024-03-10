import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCarForm = () => {
    const [car, setCar] = useState({
        make: '',
        model: '',
        year: '',
        price: ''
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        if (e.target.type === 'file') {
            // Handle file input change for images
            const files = e.target.files;
            // Convert the FileList to an array and store it in state
            setCar({ ...car, images: Array.from(files) });
        } else {
            // Handle other input changes
            setCar({ ...car, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const formData = new FormData();
            formData.append('make', car.make);
            formData.append('model', car.model);
            formData.append('year', car.year);
            formData.append('price', car.price);
            if (car.images && car.images.length > 0) {
                for (let i = 0; i < car.images.length; i++) {
                    formData.append('images[]', car.images[i]);
                }
            }
            const response = await fetch('/cars', {
                method: 'POST',
                headers: {
                   
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: formData
            });
           

            if (!response.ok) {
                const errorData = await response.json();
                if (errorData.errors) {
                    // If response contains validation errors, set the error message state
                    setErrorMessage({
                        make: errorData.errors.make ? errorData.errors.make[0] : '',
                        model: errorData.errors.model ? errorData.errors.model[0] : '',
                        year: errorData.errors.year ? errorData.errors.year[0] : '',
                        price: errorData.errors.price ? errorData.errors.price[0] : ''
                    });
                } else {
                    // If response does not contain validation errors, set the error message state to the general error message
                    setErrorMessage(errorData.message || 'Failed to add car.');
                }
            } else {
                // If response status is ok, reset the form and handle success
                setCar({
                    make: '',
                    model: '',
                    year: '',
                    price: ''
                });
                setErrorMessage(''); // Clear error message
                toast.success('Car Added successfully', {
                    position: 'top-right',
                    autoClose: 3000, // Auto close the toast after 3 seconds
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                // You can display success message to the user here
            }
        } catch (error) {
            console.error('Error adding car:', error);
            setErrorMessage('Failed to add car.'); // Set error message state for general errors
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
                <InputLabel htmlFor="make" value="Make" />
                <TextInput
                    id="make"
                    type="text"
                    name="make"
                    value={car.make}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={handleChange}
                />
                <InputError message={errorMessage.make} className="mt-2" />

            </div>
            <div className="flex flex-col">
                <InputLabel htmlFor="model" value="Model" />
                <TextInput
                    id="model"
                    type="text"
                    name="model"
                    value={car.model}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={handleChange}
                />
                <InputError message={errorMessage.model} className="mt-2" />
            </div>
            <div className="flex flex-col">
                <InputLabel htmlFor="year" value="Year" />
                <TextInput
                    id="year"
                    type="text"
                    name="year"
                    value={car.year}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={handleChange}
                />
 <InputError message={errorMessage.year} className="mt-2" />

            </div>
            <div className="flex flex-col">
                <InputLabel htmlFor="price" value="Price" />
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-700">
                        $
                    </span>
                    <TextInput
                        id="price"
                        type="text"
                        name="price"
                        value={car.price}
                        className="pl-8 pr-3 py-2 mt-1 block w-full"
                        isFocused={true}
                        onChange={handleChange}
                    />
                </div>
 <InputError message={errorMessage.price} className="mt-2" />
            </div>
            <div className="flex flex-col">
                <InputLabel htmlFor="images" value="Images" />
                <input
                    id="images"
                    type="file"
                    name="images"
                    className="mt-1 block w-full"
                    multiple // Allow multiple file uploads
                    onChange={handleChange}
                />
                 </div>
            <PrimaryButton type="submit">
                Add Car
            </PrimaryButton>

        </form>

    );
};

export default AddCarForm;
