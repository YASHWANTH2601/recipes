import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetails';
import AddRecipe from './components/AddRecipe';

function App() {
    return (
        <Router>
            <div className="App">
                <h1>Recipe Sharing Platform</h1>
                <Routes>
                    <Route path="/" element={<RecipeList />} />
                    <Route path="/:id" element={<RecipeDetail />} />
                    <Route path="/add" element={<AddRecipe />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
