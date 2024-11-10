import axios from "axios";
import { CreateRecipe, PaginatedRecipe } from "../models/Recipe";
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
    getAll: (page: number, pageSize: number, searchTerm?: string) => 
        axios.get<PaginatedRecipe>(`/recipes/?page=${page}&pageSize=${pageSize}${searchTerm ? `&searchTerm=${searchTerm}` : ""}`).then(x => x.data),
    create: (recipe: CreateRecipe) => axios.post("/recipes", recipe).then(x => x),
    delete: (id: string) => axios.delete(`/recipes/${id}`).then(x => x.data)
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