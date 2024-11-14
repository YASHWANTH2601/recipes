import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecipeFilter from '../RecipeFilter';
import './index.css';
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
        <div className='recipeContainer'>
            <h2>Recipes</h2>
            <RecipeFilter
                category={category}
                setCategory={setCategory}
                ingredient={ingredient}
                setIngredient={setIngredient}
            />
            <ul className='recipe-list'>
                {recipes.map((recipe) => (
                    <Link to={`/${recipe._id}`}>
                    <li className='recipe' key={recipe._id} >
                        <p> {recipe.title}</p>
                        <p> Category : {recipe.category}</p>
                        <p>Cooking Time : {recipe.cookingTime}</p>
                    </li>
                    </Link>
                ))}
            </ul>
           
        </div>
    );
}

export default RecipeList;
