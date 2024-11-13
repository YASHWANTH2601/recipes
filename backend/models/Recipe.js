// models/Recipe.js
import  mongoose from 'mongoose';

const RecipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    ingredients: { type: [String], required: true },
    instructions: { type: [String], required: true },
    category: { type: String, required: true },
    cookingTime: { type: Number, required: true },
    createdDate: { type: Date, default: Date.now }
});

 const Book= mongoose.model('Recipe', RecipeSchema);
export default Book