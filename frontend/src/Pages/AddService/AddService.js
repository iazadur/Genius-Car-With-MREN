import React from 'react';
import axios from 'axios'
import { useForm } from "react-hook-form";
import './AddService.css'

const AddService = () => {
    const { register, handleSubmit,reset } = useForm();
    const onSubmit = data => {
        const url = 'http://localhost:5000/services'
        axios.post(url, data)
          .then((res) => {
              if (res.data.insertedId) {
                  alert('Service added successfully')
                  reset(res.data)
              }
          })
          .catch(function (error) {
            console.log(error);
          });
        
    };
    return (
        <div className="add-sercice">
            <h2>Please Add a Services</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("name", { required: true, maxLength: 20 })} placeholder="Name" />
                <textarea {...register("description")} placeholder="Description" />
                <input type="number" {...register("price")} placeholder="price" />
                <input {...register("img")} placeholder="Image Url" />
                <input type="submit" />
            </form>
        </div>
    );
};

export default AddService;