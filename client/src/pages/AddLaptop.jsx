import '../styles/AddLaptop.css';
import { useState } from 'react';

export default function AddLaptop() {
    const [formInput, setFormInput] = useState({
        brand: '',
        model: '',
        ram: '',
        cpu: '',
        storage: '',
        price: 0,
        photoFile: null
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(formInput).forEach((key) => {
            if (key === 'photoFile') {
                formData.append('photoFile', formInput.photoFile);
            } else {
                formData.append(key, formInput[key]);
            }
        });

        try {
            const response = await fetch('http://localhost:8080/api/laptops', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('Laptop added successfully!');
                setFormInput({
                    brand: '',
                    model: '',
                    ram: '',
                    cpu: '',
                    storage: '',
                    price: 0,
                    photoFile: null
                });
            } else {
                throw new Error('Failed to add laptop');
            }
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    return (
        <div className="add-laptop-container">
            <h2>Add New Laptop</h2>
            <form onSubmit={handleSubmit} className="add-laptop-form">
                <div className="formfield">
                    <label htmlFor="brand">Brand</label>
                    <input
                        id="brand"
                        type="text"
                        value={formInput.brand}
                        onChange={(e) => setFormInput({ ...formInput, brand: e.target.value })}
                        required
                    />
                </div>

                <div className="formfield">
                    <label htmlFor="model">Model</label>
                    <input
                        id="model"
                        type="text"
                        value={formInput.model}
                        onChange={(e) => setFormInput({ ...formInput, model: e.target.value })}
                        required
                    />
                </div>

                <div className="formfield">
                    <label htmlFor="ram">RAM</label>
                    <input
                        id="ram"
                        type="text"
                        value={formInput.ram}
                        onChange={(e) => setFormInput({ ...formInput, ram: e.target.value })}
                        required
                    />
                </div>

                <div className="formfield">
                    <label htmlFor="cpu">CPU</label>
                    <input
                        id="cpu"
                        type="text"
                        value={formInput.cpu}
                        onChange={(e) => setFormInput({ ...formInput, cpu: e.target.value })}
                        required
                    />
                </div>

                <div className="formfield">
                    <label htmlFor="storage">Storage</label>
                    <input
                        id="storage"
                        type="text"
                        value={formInput.storage}
                        onChange={(e) => setFormInput({ ...formInput, storage: e.target.value })}
                        required
                    />
                </div>

                <div className="formfield">
                    <label htmlFor="price">Price</label>
                    <input
                        id="price"
                        type="number"
                        value={formInput.price}
                        onChange={(e) => setFormInput({ ...formInput, price: e.target.value })}
                        required
                    />
                </div>

                <div className="formfield">
                    <label htmlFor="photoFile">Laptop Photo</label>
                    <input
                        id="photoFile"
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                            setFormInput((prev) => ({
                                ...prev,
                                photoFile: e.target.files[0],
                            }))
                        }
                        required
                    />
                </div>

                <button type="submit">Add Laptop</button>
            </form>
        </div>
    );
}
