import { useEffect, useState, type SetStateAction } from "react"
import type CartInterface from "../../types/cart.types";
import img from "../../assets/image/default-food-img.jpg"
import { Link, useNavigate } from "react-router-dom";
import { getCheckoutItems, placeOrder } from "../../services/JournalService";
import type AddressInterface from "../../types/Address.interface";
import AddAddress from "../address/AddAdress";
import { useForm } from "react-hook-form";
import { Home, Phone, User, Users } from "lucide-react";
import type OrderInterface from "../../types/OrderController";
const Checkout = () => {

    const [cartData, setCartData] = useState<CartInterface | null>(null)
    const [isAddressPopUpOpen, setAddressPop] = useState<boolean>(false);
    const [address, setAddress] = useState<AddressInterface | null>(null)
    const [selectedPaymentMode, setSelectedPaymentMode] = useState('');
    const [selectedAddressIndex, setSelectedAddressIndex] = useState(-1);
    const [addressList, setAddressList] = useState<AddressInterface[] | null>(null);

    const navigate = useNavigate();


    const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setSelectedPaymentMode(event.target.value);
    };


    const placeOrderFunc = async () => {
        try {
            if (selectedPaymentMode == '') {
                alert("Select payment method");
                return;
            }

            if (addressList == null) {
                alert("No address present")
            }

            if (selectedAddressIndex == -1) {
                alert("No address selected")
            }
            let data: OrderInterface = {
                address: '',
                deliveryCharge: 0,
                platformFee: 0,
                totalPrice: 0,
                paymentMode: '',
            };
            if (cartData != null) {
                data.address = cartData.address[selectedAddressIndex]._id;
                data.deliveryCharge = cartData.configData.deliveryCharge
                data.platformFee = cartData.configData.platformFee
                data.totalPrice = cartData.totalPrice,
                    data.paymentMode = selectedPaymentMode
            }
            const response = await placeOrder(data);
            if (response.data) {
                navigate("/")
            }

        } catch (error) {

        }
    }

    useEffect(() => {
        fetchCartItems();
    }, []);



    const fetchCartItems = async () => {
        try {
            const data = await getCheckoutItems();
            if (data.data && data.data.cartItem.length > 0) {
                setCartData(data.data)
                console.log("data is", data.data)

                if (data.data.address && data.data.address.length > 0) {
                    setAddressList(data.data.address);
                    setSelectedAddressIndex(0);
                }
            } else {
                setCartData(null)
                console.log("no data found")
            }
        } catch (error) {

        }
    }

    function closeAddressPopUp() {
        setAddressPop(false)
    }

    return (
        <>

            {isAddressPopUpOpen && <>

                <div
                    className="fixed inset-0 bg-gray-100 opacity-55 z-50"></div>

                <div className="absolute z-100 w-full h-full top-0 flex justify-center item-center " >
                    <div className="self-center bg-white w-full md:w-[450px] ">

                        <AddAddress cancel={closeAddressPopUp} />
                    </div>
                </div>

            </>
            }

            {Array.isArray(cartData?.cartItem) && cartData?.cartItem.length > 0 ?
                <div className="container mx-auto px-2 my-4 flex flex-col md:flex-row">
                    <div>

                        {cartData.address.length > 0 ? <>
                            <div className="border-1 rounded-lg my-2 p-4 bg-gray-100">
                                <p className="flex items-center gap-1"><User size={20} /> : {cartData.address[selectedAddressIndex].name}</p>
                                <p className="flex items-center gap-1 my-1"><Phone size={20} /> : {cartData.address[selectedAddressIndex].number}</p>
                                <p className="flex "> <Home className="mt-[4px]" /> <span className="px-1">:</span>
                                    {cartData.address[selectedAddressIndex].address}, {cartData.address[selectedAddressIndex].city} , {cartData.address[selectedAddressIndex].state} , {cartData.address[selectedAddressIndex].country}
                                </p>
                                <p className="underline font-semibold">Choose Another Address</p>
                            </div>
                        </> : <p className="flex justify-center h-15 bg-gray-200 rounded-lg my-2 m-4 items-center">No Address Present</p>}
                        <div className="text-end pr-4 mb-4 font-semibold">
                            <p onClick={() => { setAddressPop(true) }} className="inline bg-yellow-400 px-4 rounded py-1 hover:bg-yellow-500 transition-background duration-200 ">Add New Adress {isAddressPopUpOpen}</p>
                        </div>

                        {cartData.cartItem.map((item, index) => {
                            return (
                                <>
                                    <div key={index} className="mx-4 my-2 overflow-hidden rounded-xl p-3 border-1 border-gray-400 flex flex-col md:flex-row gap-4">
                                        <img src={item.menu?.imageUrl || img} alt="" className="rounded-lg  w-[100%] md:w-60" />
                                        <div className="px-2 py-2" >
                                            <p className="font-semibold">
                                                {item.menu.name}
                                            </p>

                                            <p className="line-clamp-3">

                                                {item.menu.description}
                                            </p>
                                            <p>&#x20b9; {item.menu.price * item.quantity}</p>
                                            <div className="flex gap-2 items-center mt-2">

                                                <p className="font-semibold">Quantity:   {item.quantity}
                                                </p>
                                            </div>

                                        </div>
                                    </div>
                                </>
                            )
                        })
                        }

                    </div>
                    <div className=" w-[95%] md:w-200 mx-4 my-2 md:mx-2  self-start">
                        <div className="border-1 rounded-xl border-gray-500 px-6 py-2">

                            <p className="flex justify-between font-semibold">
                                Price  <span>&#x20b9; {cartData.totalPrice}</span>
                            </p>
                            {cartData?.configData?.discount > 0 && <p>Discount <span>{cartData.configData.discount}</span>
                            </p>}
                            <p className="flex justify-between font-semibold">Platform Fee <span>{cartData?.configData?.platformFee ? <> &#x20b9;{cartData.configData.platformFee}</> : <> &#x20b9; 0</>}</span></p>
                            <hr className="text-gray-400 my-1" />
                            <p className="flex justify-between font-semibold">Total price <span>{cartData.totalPrice ? <> &#x20b9;{cartData.totalPrice} </> : <> &#x20b9; 0 </>}</span></p>

                            <button onClick={placeOrderFunc} className="bg-yellow-300 block rounded-lg hover:font-semibold hover:bg-yellow-400 transistion-all duration-300 w-[100%] p-1 my-2"> <Link to="/checkout"> Place Order</Link></button>
                        </div>



                        <div className="mt-2">
                            {Array.isArray(cartData?.configData?.paymentModes) && cartData.configData.paymentModes.length > 0 &&
                                <>
                                    <h3 className="font-semibold">Select Payment Mode:</h3>
                                    {cartData.configData.paymentModes.map((item, index) => {
                                        return (

                                            <label key={index} className="my-1 font-normal" >
                                                <input
                                                    type="radio"
                                                    name="paymentMode"
                                                    value={item}
                                                    className="text-yellow-400 mx-1"
                                                    checked={selectedPaymentMode === item}
                                                    onChange={handleChange}
                                                />
                                                {item}
                                            </label>
                                        )

                                    })}
                                </>
                            }
                        </div>
                    </div>

                </div>
                :
                <>
                    No data found
                </>}
        </>
    )
}

export default Checkout;