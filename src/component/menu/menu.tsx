import type React from "react";
import type MenuPropsInterface from "../../types/MenuProps";
import { useEffect, useState } from "react";
import img from "../../assets/image/default-food-img.jpg"
import { updateCartQuantity } from "../../services/JournalService";
import {type RootState } from "../../redux/store";
import { useSelector } from "react-redux";

const MenuList: React.FC<MenuPropsInterface> = ({ list }) => {

    const [isOpenModal,setIsOpenModal] = useState<boolean>(false);
    const [index,setIndex] = useState<number|null>(null)
    const user = useSelector((state:RootState)=>state.userReducer.user)

     const addItemToCart = async (id:string) =>{
            try {
              const req = {
                menu:id,
                userId:user?user._id:null,
                quantity:1

              }
                const data = await updateCartQuantity(req);

                if(data.data){
                  setIsOpenModal(false);
                }
                console.log(data.message)
            } catch (error) {
                
            }
        }

        
  useEffect(() => {
    console.log("list is", list);
  }, [list]); // Runs only when `list` changes.

  return (
    <>

    {isOpenModal && index!=null && <>
    
    <div className="absolute top-0 w-full h-full opacity-75 bg-gray-200" >

    </div>

    <div className="absolute z-100 w-full h-full top-0 flex justify-center item-center " onClick={()=>{setIndex(null), setIsOpenModal(false)}}>
        <div className="bg-white self-center p-2 rounded-xl md:max-w-[40%] " onClick={(e) => e.stopPropagation()}>
        <img src={list[index].image_url||img} alt="" className="mx-auto mt-2"/>
        <div className="p-3">
        <p className="font-semibold">
        {list[index].name} 
        </p>
        <p className="font-semibold">&#x20b9; {list[index].price}</p>
        <p>
        {list[index].description}
        </p>
        <div className="text-center mt-4 ">
            <button onClick={()=>{addItemToCart(list[index]._id)}} className="rounded font-semibold bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1">Add to Cart</button>
        </div>
        </div>

        </div>
    </div>
    
    </>}



    <div className="grid grid-cols-3 gap-4 mx-auto container my-16 hover ">
      {Array.isArray(list) && list.length > 0 ? (
        list.map((item, index) => {
          return (
            <>
            <div onClick={()=>{setIsOpenModal(true),setIndex(index)}} className="border-1 border-gray-200 overflow-hidden rounded-lg transition-transform transform hover:scale-x-105 hover:scale-y-105 duration-200 ease-out-in">
                <img src={item.image_url||img} alt="" />
                <div className="p-2">

           <p key={index} className="font-semibold"> {item.name}</p>
           <p> &#x20b9;
            {item.price}
           </p>
                </div>

            </div>
            </>
          )
        })
      ) : (
        <div>No data found</div>
      )}

      </div>
    </>
  );
};

export default MenuList;
