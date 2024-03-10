import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Logs({ auth }) {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        // Fetch the list of logs from the API when the component mounts
        fetch('/api/logs')
            .then(response => response.json())
            .then(data => setLogs(data))
            .catch(error => console.error('Error fetching logs:', error));
          
    }, []);

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Logs</h2>}>
            <Head title="Logs" />
            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 font-semibold text-xl text-gray-800 leading-tight">List of logs</div>
                        <div className="p-6">
                            <h1 className="text-2xl font-bold mb-4">Log List</h1>
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {logs.map(log => (
                                        <tr key={log.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">{log.user_id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{log.action}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
