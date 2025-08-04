import type React from "react";
import { getMenuByResturant } from "../../services/JournalService";
import { useEffect } from "react";
import {  useParams } from "react-router-dom";

const MenuByResturant: React.FC = () => {
const { id } = useParams<{ id: string }>();


useEffect(()=>{
    console.log("id is",id)
    fetchMenuByResturant()
},[])

    async function fetchMenuByResturant() {
        try {
            if(id!=null){

                const data = await getMenuByResturant(id);
                
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
            <div>menu by Resturant {id}</div>
        </>
    )
};

export default MenuByResturant;