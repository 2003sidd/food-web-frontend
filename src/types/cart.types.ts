import type AddressInterface from "./Address.interface"

export default interface CartInterface {
    cartItem: cartItem[],
    price: number,
    totalPrice: number,
    configData: {
        platformFee: number,
        discount: number,
        deliveryCharge: number,
        paymentModes: string[]
    },
    address: AddressInterface[],
}


export default interface CheckoutInterface {
    cartItem: cartItem[],
    price: number,
    totalPrice: number,
    configData: {
        platformFee: number,
        discount: number,
        deliveryCharge: number,
        paymentModes: string[]
    }
}

interface cartItem {
    _id: string,
    quantity: number,
    menu: {
        _id: string,
        name: string,
        description: string,
        price: number,
        available: boolean,
        imageUrl: string
    },
}