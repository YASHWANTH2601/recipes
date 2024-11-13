import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function RecipeDetail() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
          // console.log(process.env.REACT_APP_API_URL)
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json(); 
                setRecipe(data); 
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };

        fetchRecipe();
    }, [id]);

    if (!recipe) return <p>Loading...</p>;

    return (
        <div>
            <h2>{recipe.title}</h2>
            <p><strong>Category:</strong> {recipe.category}</p>
            <p><strong>Cooking Time:</strong> {recipe.cookingTime} minutes</p>
            <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
            <h3>Instructions:</h3>
            <ol>
                {recipe.instructions.map((step, index) => (
                    <li key={index}>{step}</li>
                ))}
            </ol>
        </div>
    );
}

export default RecipeDetail;
