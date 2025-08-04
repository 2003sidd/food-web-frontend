import type React from "react";
import { getMenuByCategory } from "../../services/JournalService";
import { useEffect } from "react";
import {  useParams } from "react-router-dom";

const MenuByCategory: React.FC = () => {
const { id } = useParams<{ id: string }>();


useEffect(()=>{
    console.log("id is",id)
    fetchMenuByResturant()
},[])

    async function fetchMenuByResturant() {
        try {
            if(id!=null){

                const data = await getMenuByCategory(id);
                
                if(data.data){
                    console.log("worked well")
                }else{
                    console.log("not working")
                }
            }
        } catch (error) {
            console.log("error")
        }
    }

    return (
        <>
            <div>menu by Category {id}</div>
        </>
    )
};

export default MenuByCategory;