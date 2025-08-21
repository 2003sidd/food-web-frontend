import type AddressInterface from "./Address.interface";
import type MenuInterface from "./MenuInterface";

export default interface OrderInterface {
    address: string,
    platformFee: number,
    deliveryCharge: number,
    paymentMode: string,
    totalPrice: number
}

export interface OrderListInterface {
    _id: string,
    totalPrice: number,
    status: string,
    items:{
        menu:MenuInterface
    }[]
    paymentMode: string,
    address: AddressInterface,
    deliveryCharge: number,

}