import { useEffect, useState } from "react"
import type CartInterface from "../../types/cart.types";
import img from "../../assets/image/default-food-img.jpg"
import { Link } from "react-router-dom";
import { deleteCartItem, getCartItems, updateCartQuantity } from "../../services/JournalService";
import { Minus, Plus, X } from "lucide-react";
const Cart = () => {

    const [cartData, setCartData] = useState<CartInterface | null>(null)
    useEffect(() => {
        fetchCartItems();
    }, []);

    const updateQuantity = async (id: string, quantity: number) => {
        try {
            const req = {
                menuId: id,
                quantity: quantity
            }
            const data = await updateCartQuantity(req);
            if (data.data) {
                fetchCartItems()
            } else {
                console.log(data.message)
            }
        } catch (error) {

        }
    }

    function changeCartItem(quantity: number, menuId: string, id: string) {
        if (quantity == 0) {
            deleteItem(id);
        } else {
            updateQuantity(menuId, quantity)
        }

    }

    async function deleteItem(id: string) {
        const data = await deleteCartItem(id);
        if (data.data) {
            fetchCartItems()
        } else {
            console.log(data.data)
        }
    }

    const fetchCartItems = async () => {
        try {
            const data = await getCartItems();
            if (data.data && data.data.cartItem.length > 0) {
                setCartData(data.data)
                console.log("data is", data.data)
            } else {
                setCartData(null)
                console.log("no data found")
            }
        } catch (error) {

        }
    }

    return (
        <>
            {Array.isArray(cartData?.cartItem) && cartData?.cartItem.length > 0 ?
                <div className="container mx-auto px-2 my-4 flex flex-col md:flex-row">
                    <div>

                        {cartData.cartItem.map((item, index) => {
                            return (
                                <>
                                    <div key={index} className="mx-4 my-2 overflow-hidden rounded-xl p-3 border-1 border-gray-400 flex flex-col md:flex-row gap-4">
                                        <img src={item.menu?.imageUrl || img} alt="" className="rounded-lg  w-[100%] md:w-60" />
                                        <div className="px-2 py-2" >
                                            <div className="flex justify-between">
                                                <p className="font-semibold">
                                                {item.menu.name}
                                            </p>
                                                <X className=" cursor-pointer " onClick={() => deleteItem(item._id)} />
                                            </div>
                                            
                                            <p className="line-clamp-3">

                                                {item.menu.description}
                                            </p>
                                            <p>&#x20b9; {item.menu.price * item.quantity}</p>
                                            <div className="flex gap-2 items-center mt-2">
                                                <button onClick={() => changeCartItem(item.quantity - 1, item.menu._id, item._id)} className="px-2 py-1 rounded font-bold bg-gray-200 transistion-background duration-200 delay-100 active:bg-gray-400 te bg-yellow"> <Minus /> </button>

                                                <p className="font-semibold">Quantity:   {item.quantity}
                                                </p>
                                                <button onClick={() => changeCartItem(item.quantity + 1, item.menu._id, item._id)} className="px-2 py-1 rounded font-bold bg-gray-200 te bg-yellow delay-100  transistion-background duration-200 active:bg-gray-400"> <Plus /> </button>
                                            </div>

                                        </div>
                                    </div>
                                </>
                            )
                        })
                        }


                    </div>
                    <div className=" text-center w-[95%] md:w-200 border-1 rounded-xl border-gray-500 mx-4 my-2 md:mx-2 px-6 py-2 self-start">
                        <p className="flex justify-between font-semibold">
                            Price  <span>&#x20b9; {cartData.totalPrice}</span>
                        </p>
                        {cartData.configData.discount > 0 && <p>Discount <span>{cartData.configData.discount}</span>
                        </p>}
                       <p className="flex justify-between font-semibold">Platform Fee <span>{cartData.configData.platformFee? <> &#x20b9;{cartData.configData.platformFee}</> : <> &#x20b9; 0</>  }</span></p>
                        <hr className="text-gray-400 my-1" />
                        <p className="flex justify-between font-semibold">Total price <span>{cartData.totalPrice? <> &#x20b9;{cartData.totalPrice} </> : <> &#x20b9; 0 </> }</span></p>

                        <button className="bg-yellow-300 block rounded-lg hover:font-semibold hover:bg-yellow-400 transistion-all duration-300 w-[100%] p-1 my-2"> <Link to="/checkout"> Go To Checkout</Link></button>
                    </div>

                </div>
                :
                <>
                    No data found
                </>}
        </>
    )
}

export default Cart;