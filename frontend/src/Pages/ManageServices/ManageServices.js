import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ManageServices = () => {
    const [services, setServices] = useState([])
    useEffect(() => {
        axios.get('http://localhost:5000/service')
            .then((res) => {
                setServices(res.data)
            })
    }, [])
    const handleDelete = (id) => {
        const url = `http://localhost:5000/services/${id}`
        fetch(url,{
            method:'DELETE',
        })
        .then(res=>res.json())
        .then(data=>{
            if (data.deletedCount) {
                alert('Deleted Successfully !')
                const remining = services.filter(service=>service._id !== id)
                setServices(remining)
            }
        })
    }
    return (
        <div>
            <h2>Mange Services</h2>
            {
                services.map(service => (
                    <div key={service._id}>
                        {service.name} <button onClick={() => {
                            handleDelete(service._id)
                        }}>delete</button>
                    </div>
                ))
            }
        </div>
    );
};

export default ManageServices;