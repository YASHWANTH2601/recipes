import React from 'react';
import { Link } from 'react-router-dom';
function RecipeFilter({ category, setCategory, ingredient, setIngredient }) {
    return (
        <div style={{ marginBottom: '20px' }}>
            <label>
                Filter by Category:
                <select onChange={(e) => setCategory(e.target.value)} value={category}>
                    <option value="">All Categories</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Snack">Snack</option>
                    <option value="Dessert">Dessert</option>
                </select>
            </label>
            <label style={{ marginLeft: '20px' }}>
                Search by Ingredient:
                <input
                    type="text"
                    placeholder="e.g., chicken"
                    value={ingredient}
                    onChange={(e) => setIngredient(e.target.value)}
                />
            </label>
            <Link style={{ marginLeft: '20px' }} className='' to="/add">Add New Recipe</Link>
        </div>
    );
}

export default RecipeFilter;
