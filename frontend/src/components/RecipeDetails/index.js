import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './index.css';
function RecipeDetail() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/${id}`);
                const data = await response.json();
                setRecipe(data);
            } catch (error) {
                console.error("Error fetching recipe:", error);
            }
        };
        fetchRecipe();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this recipe?")) {
            try {
                await fetch(`${process.env.REACT_APP_API_URL}/${id}`, { method: 'DELETE' });
                navigate('/');
            } catch (error) {
                console.error("Error deleting recipe:", error);
            }
        }
    };

    if (!recipe) return <p>Loading...</p>;

    return (
        <div className='detailContainer'>
            <div>

                <button ><Link to="/">Go Back</Link></button>
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
                <button onClick={handleDelete}>Delete Recipe</button>
                <Link to={`/edit/${id}`} style={{ marginLeft: '10px' }}>Edit Recipe</Link>
            </div>
        </div>
    );
}

export default RecipeDetail;

