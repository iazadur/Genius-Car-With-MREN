import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const Booking = () => {
    const { serviceId } = useParams();
    const [service, setService] = useState({})
    useEffect(() => {
        axios.get(`http://localhost:5000/service/${serviceId}`)
            .then((res) => {
                setService(res.data)

            })
    }, [serviceId])
    return (
        <div>
            <h2>Details of: {service?.name}</h2>
            <h2>this is booking: {serviceId}</h2>
        </div>
    );
};

export default Booking;