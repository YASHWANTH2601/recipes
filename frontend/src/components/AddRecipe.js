import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddRecipe() {
    const [form, setForm] = useState({
        title: '',
        ingredients: '',
        instructions: '',
        category: '',
        cookingTime: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedData = {
            ...form,
            ingredients: form.ingredients.split(',').map((i) => i.trim()),
            instructions: form.instructions.split('.').map((i) => i.trim())
        };
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}`, {
              method: 'POST', // Request method
              headers: {
                'Content-Type': 'application/json',
                // Add more headers if needed
              },
              body: JSON.stringify(formattedData), // Convert data to JSON
            });
        
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
        
            const result = await response.json(); // Parse JSON response
            console.log(result); // Handle the response
          } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
          }
        // await axios.post(`${process.env.REACT_APP_API_URL}/recipes`, formattedData);
        navigate('/');
    };

    return (
        <div>
            <h2>Add Recipe</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input type="text" name="title" value={form.title} onChange={handleChange} required />
                </label>
                <label>
                    Ingredients (comma separated):
                    <input type="text" name="ingredients" value={form.ingredients} onChange={handleChange} required />
                </label>
                <label>
                    Instructions (separate steps with periods):
                    <textarea name="instructions" value={form.instructions} onChange={handleChange} required />
                </label>
                <label>
                    Category:
                    <select name="category" value={form.category} onChange={handleChange} required>
                        <option value="">Select Category</option>
                        <option value="Breakfast">Breakfast</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                        <option value="Snack">Snack</option>
                        <option value="Dessert">Dessert</option>
                    </select>
                </label>
                <label>
                    Cooking Time (minutes):
                    <input type="number" name="cookingTime" value={form.cookingTime} onChange={handleChange} required />
                </label>
                <button type="submit">Add Recipe</button>
            </form>
        </div>
    );
}

export default AddRecipe;
