import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecipeFilter from './RecipeFilter';

function RecipeList() {
    const [recipes, setRecipes] = useState([]);
    const [category, setCategory] = useState('');
    const [ingredient, setIngredient] = useState('');

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const queryParams = new URLSearchParams({
                    category,
                    ingredient,
                }).toString();
             
                const response = await fetch(`${process.env.REACT_APP_API_URL}?${queryParams}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setRecipes(data);
                // console.log(data); 
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };

        fetchRecipes();
    }, [category, ingredient]);

    return (
        <div>
            <h2>Recipes</h2>
            <RecipeFilter
                category={category}
                setCategory={setCategory}
                ingredient={ingredient}
                setIngredient={setIngredient}
            />
            <ul>
                {recipes.map((recipe) => (
                    <Link to={`/${recipe._id}`}>
                    <li key={recipe._id} >
                        <p>{recipe.title}</p>
                        <p>{recipe.category}</p>
                        <p>{recipe.cookingTime}</p>
                    </li>
                    </Link>
                ))}
            </ul>
            <Link to="/add">Add New Recipe</Link>
        </div>
    );
}

export default RecipeList;
