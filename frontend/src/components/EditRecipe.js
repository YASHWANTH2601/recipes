import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditRecipe() {
    const { id } = useParams();
    const [form, setForm] = useState({
        title: '',
        ingredients: '',
        instructions: '',
        category: '',
        cookingTime: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/${id}`);
                const recipe = await response.json();
                setForm({
                    title: recipe.title,
                    ingredients: recipe.ingredients.join(', '),
                    instructions: recipe.instructions.join('. '),
                    category: recipe.category,
                    cookingTime: recipe.cookingTime
                });
            } catch (error) {
                console.error("Error fetching recipe:", error);
            }
        };
        fetchRecipe();
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedData = {
            ...form,
            ingredients: form.ingredients.split(',').map((i) => i.trim()),
            instructions: form.instructions.split('.').map((i) => i.trim())
        };
        try {
            await fetch(`${process.env.REACT_APP_API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData)
            });
            navigate(`/${id}`);
        } catch (error) {
            console.error("Error updating recipe:", error);
        }
    };

    return (
        <div>
            <h2>Edit Recipe</h2>
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
                <button type="submit">Update Recipe</button>
            </form>
        </div>
    );
}

export default EditRecipe;
