import { useForm, type SubmitHandler } from "react-hook-form";
import type AddressInterface from "../../types/Address.interface";
import type chilProps from "../../types/AddressChildProps";
import { addAddress } from "../../services/JournalService";


const AddAddress: React.FC<chilProps> = ({ cancel }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AddressInterface>()
    const onSubmit: SubmitHandler<AddressInterface> = async (data) => {
        const response = await addAddress(data);
        if (response.data) {
            cancel();
        } else {
            console.log(response.message)
        }
        console.log(data)

    }

    return (
        <>
            <div className="my-4 px-4">
                <div >

                    <h1 className="my-2 text-center font-semibold">Add New Address</h1>
                </div>

                <h1></h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h3 className="my-4 font-semibold text-[0.9rem]">Contact Details</h3>

                    <div className="my-4 ">

                        <input type="text"  {...register("name", { required: true })} placeholder="Name*" className="border-1 px-2 text-[0.9rem] py-2 border-gray-300 w-full rounded block outline-0" />
                        {errors.name && <span className="text-red-400 text-sm ps-2">Name is required field</span>}
                    </div>
                    <div className="my-4 ">
                        <input type="text"  {...register('number', {
                            required: 'This field is required.',

                        })} placeholder="Mobile No*" className="border-1 px-2 text-[0.9rem] py-2 border-gray-300 w-full rounded block outline-0" />
                        {errors.number && <span className="text-red-400 text-sm ps-2">{errors.number.message}</span>}

                    </div>

                    <h3 className="my-4 font-semibold text-[0.9rem]">Address</h3>
                    <div>
                        <input type="text"  {...register('pincode', {
                            valueAsNumber: true,
                            required: 'This field is required.',

                        })} placeholder="Pin Code*" className="border-1 px-2 text-[0.9rem] py-2 border-gray-300 w-full rounded block outline-0" />
                        {errors.pincode && <span className="text-red-400 text-sm ps-2">{errors.pincode.message}</span>}

                    </div>
                    <div className="my-4">

                        <input type="text" {...register("address", { required: true })} placeholder="Address*" className="border-1  px-2 text-[0.9rem] py-2 border-gray-300 w-full rounded block outline-0" />
                        {errors.address && <span className="text-red-400 text-sm ps-2">Address is required field</span>}

                    </div>
                    <div className="my-4">

                        <input type="text" {...register("city", { required: true })} placeholder="City*" className="border-1  px-2 text-[0.9rem] py-2 border-gray-300 w-full rounded block outline-0" />
                        {errors.city && <span className="text-red-400 text-sm ps-2">City is required field</span>}

                    </div>
                    <div className="my-4">

                        <input type="text" {...register("state", { required: true })} placeholder="State*" className="border-1 px-2 text-[0.9rem] py-2 border-gray-300 w-full rounded block outline-0" />
                        {errors.state && <span className="text-red-400 text-sm ps-2">State is required field</span>}

                    </div>

                    <hr className="text-gray-300" />

                    <div className="flex px-4 py-2 gap-4 mt-2">
                        <button onClick={cancel} className="flex-grow p-2 border-1 font-semibold  border-gray-300 rounded-xl">Cancel</button>
                        {/* <input type="submit" /> */}
                        <input type="submit" className="flex-grow p-2 bg-yellow-400  font-semibold border-1 border-gray-300 rounded-xl" />
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddAddress;