import { get } from "../api/api";
import type CategoryInterface from "../types/Category.interface";
import type { GenericResponseType } from "../types/genricResponse.types";
import type MenuInterface from "../types/MenuInterface";
import type ResturantInterface from "../types/Resturant.interface";

export const getAllCategory = () => {
  return get<GenericResponseType<CategoryInterface[]>>('/api/category/getCategory');
};

export const getAllResturant = () =>{
  return get<GenericResponseType<ResturantInterface[]>>(`/api/resturant/getResturant`)
}

export const getMenuByResturant = (id:string) =>{
  return get<GenericResponseType<MenuInterface[]>>(`/api/menu/getMenuByResturant/${id}`)

}

export const getMenuByCategory = (id:string) => {
  return get<GenericResponseType<MenuInterface[]>>(`/api/menu/getMenuByCategory/${id}`)
}