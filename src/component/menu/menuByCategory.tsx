import type React from "react";
import { getMenuByCategory } from "../../services/JournalService";
import { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import MenuList from "./menu";
import type MenuInterface from "../../types/MenuInterface";

const MenuByCategory: React.FC = () => {
const { id } = useParams<{ id: string }>();
const [data,setData] = useState<MenuInterface[]|null>(null)

useEffect(()=>{
    console.log("id is",id)
    fetchMenuByResturant()
},[])

    async function fetchMenuByResturant() {
        try {
            if(id!=null){

                const data = await getMenuByCategory(id);

                if(data.data && data.data.length>0){
                    setData(data.data)
                    console.log("worked well")
                }else{
                    console.log("not working")
                }
               
            }
        } catch (error) {
            console.log("error at api calling is",error)
        }
    }

    return (
        <>

        id is - {id}
                {data!=null ? <div>
                    <MenuList list={data} />
                    
                    </div>
                    :<div className="my-6 ">
                    No data found
                </div>
            }
        </>
    )
};

export default MenuByCategory;