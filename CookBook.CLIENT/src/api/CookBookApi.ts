import axios from "axios";
import { CreateRecipe, Recipe } from "../models/Recipe";
import { CreateIngredientRequest, Ingredient } from "../models/Ingredient";

axios.defaults.baseURL = 'http://localhost:5000/api';
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use(config => {
    config.headers['Authorization'] = `Bearer ` + sessionStorage.getItem('jwt');
    return config
})

const authentication = {
    login: (email: string, password: string) => 
        axios.post('/authentication/login',{email,password}).then(x => x.data),

    register: (name: string , email: string, password: string) => 
        axios.post('/authentication/register',{name,email,password}).then(x => x.data)
}

const recipes = {
    getAll: () => axios.get<Recipe[]>("/recipes").then(x => x.data),
    create: (recipe: CreateRecipe) => axios.post("/recipes", recipe).then(x => x)
}

const ingredients = {
    getAll: () => axios.get<Ingredient[]>("/ingredients").then(x => x.data),
    create: (ingredient: CreateIngredientRequest) => axios.post("/ingredients",ingredient).then(x => x)
}

export const api = {
    authentication,
    recipes,
    ingredients
}