import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import EditCarModal from './EditCarModal';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Cars({ auth }) {
    const [cars, setCars] = useState([]);
    const [selectedCar, setSelectedCar] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');


    useEffect(() => {
        // Fetch the list of cars from the API when the component mounts
        fetch('/api/displayCars')
            .then(response => response.json())
            .then(data => setCars(data))
            // .catch(error => console.error('Error fetching cars:', error));
            
    }, []);

    const handleEdit = (car) => {
        setSelectedCar(car);
    };

    const handleSave = (editedCar) => {
        // Send a PUT request to update the car details
        fetch(`/api/cars/${editedCar.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            body: JSON.stringify(editedCar)
        })
        .then(response => {
            if (!response.ok) {
                console.log(response)
                throw new Error('Failed to update car');
            }
            // Update the cars list
            setCars(prevCars => prevCars.map(car => (car.id === editedCar.id ? editedCar : car)));
           
            toast.success('Car Updated successfully', {
                position: 'top-right',
                autoClose: 3000, // Auto close the toast after 3 seconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            }); 
         // Close the modal after successful update
        })
        .catch(error => console.error('Error updating car:', error));
    };

    const handleCloseModal = () => {
        setSelectedCar(null);
    };

    const handleDelete = (id) => {
        // Send a DELETE request to the API to delete the car with the specified id
        fetch(`/api/cars/${id}`, {
            method: 'DELETE',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            }
        })
        .then(() => {
            // Remove the deleted car from the list of cars
            setCars(cars.filter(car => car.id !== id));
            toast.error('Car Deleted successfully', {
                position: 'top-right',
                autoClose: 3000, // Auto close the toast after 3 seconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            }); 
        })
        // .catch(error => console.error('Error deleting car:', error));
    };

    const filteredCars = cars.filter(car => {
        return car.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
               car.model.toLowerCase().includes(searchQuery.toLowerCase());
    });


    return (

        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">List of All Cars</h2>}>
        <Head title="Dashboard" />
        <div className="py-6">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 font-semibold text-xl text-gray-800 leading-tight">List of cars in stock</div>
                    <div className="p-6">
                        <h1 className="text-md font-bold mb-4">Search Car:
                        <input
                                type="text"
                                placeholder="i.e Lamborgini"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="ml-2 border border-gray-300 rounded-md px-3 py-2 mb-4"
                            />
                            </h1>
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Photo</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Make</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredCars.map(car => (
                                    <tr key={car.id}>
                                       <td className="px-6 py-4 whitespace-nowrap">    {car.photos.map((photo) => ( <img  src={'storage/' + photo.url} alt={`Car Photo ${photo.id}`}  className="w-[48px] h-[48px] rounded-full" />  ))}</td> 
                                        <td className="px-6 py-4 whitespace-nowrap">{car.make}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{car.model}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{car.year}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">${car.price}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button onClick={() => handleEdit(car)}  className="text-indigo-600 hover:text-indigo-900">Edit</button>
                                            
                                            <button onClick={() => handleDelete(car.id)} className="ml-4  text-red-600 hover:text-red-900">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {selectedCar && (
                <EditCarModal car={selectedCar} onSave={handleSave} onClose={handleCloseModal} />
                
            )}
              <ToastContainer />
                    </div>
                </div>
            </div>
        </div>
      
    </AuthenticatedLayout>
       
    );
};


