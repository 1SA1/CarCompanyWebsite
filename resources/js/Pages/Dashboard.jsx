import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import AddCarForm from '@/Pages/Cars/AddCarForm';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Add a Car</h2>}
        >
            <Head title="Dashboard" />
        

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 font-semibold text-xl text-gray-800 leading-tight">Enter Car Specifications</div>
                        <div className="p-6">
                    <AddCarForm />
                    <ToastContainer position="top-right" />
                </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
