import { get, post, del } from "../api/api";
import type AddressInterface from "../types/Address.interface";
import type CartInterface from "../types/cart.types";
import type CartQuantityUpdateInterface from "../types/CartQuantityUpdate";
import type CategoryInterface from "../types/Category.interface";
import type { GenericResponseType } from "../types/genricResponse.types";
import type MenuInterface from "../types/MenuInterface";
import type { OrderListInterface } from "../types/OrderController";
import type OrderInterface from "../types/OrderController";
import type ResturantInterface from "../types/Resturant.interface";

export const getAllCategory = () => {
  return get<GenericResponseType<CategoryInterface[]>>('/api/category/getCategory');
};

export const getAllResturant = () => {
  return get<GenericResponseType<ResturantInterface[]>>(`/api/resturant/getResturant`)
}

export const getMenuByResturant = (id: string) => {
  return get<GenericResponseType<MenuInterface[]>>(`/api/menu/getMenuByResturant/${id}`)

}

export const getMenuByCategory = (id: string) => {
  return get<GenericResponseType<MenuInterface[]>>(`/api/menu/getMenuByCategory/${id}`)
}

export const getCartItems = () => {
  return get<GenericResponseType<CartInterface>>('api/cart/getCartItems')
}

export const getCheckoutItems = () => {
  return get<GenericResponseType<CartInterface>>('api/cart/checkout')
}

export const updateCartQuantity = (data: any) => {
  return post<MenuInterface, GenericResponseType<boolean>>('api/cart/updateCartItem', data)
}

export const deleteCartItem = (id: string) => {
  return del<GenericResponseType<boolean>>(`api/cart/deleteCartItem/${id}`)
}

export const addAddress = (data: AddressInterface) => {
  return post<AddressInterface, GenericResponseType<Boolean>>('api/address/addAddress', data);
}

export const getAddress = () => {
  return get<GenericResponseType<AddressInterface[]>>('api/address/addAddress');
}

export const placeOrder = (data: OrderInterface) => {
  return post<OrderInterface, GenericResponseType<boolean>>('api/order/placeOrder', data);
}

export const getOrders = () => {
  return get<GenericResponseType<OrderListInterface[]>>('api/order/getOrders')
}