import { useEffect, useState } from "react";
import { getAllResturant } from "../../services/JournalService";
import type ResturantInterface from "../../types/Resturant.interface";
import { useNavigate } from "react-router-dom";

const Resturant = () =>{

      const [data,setData] = useState<ResturantInterface[]|null>(null)
         const navigate = useNavigate();


       const navigateToMenuListByResturant = (id:string)=>{
          console.log("id is",id)
           navigate(`/MenuByResturant/${id}`);
      }

      const fetchCategory = async () =>{
            try {
              const data = await getAllResturant();
              if(data.data)
                setData(data.data)
            } catch (error) {
              
            }
          }

          useEffect(()=>{
            fetchCategory()
          },[])

    return (
        <>
        <div className="grid grid-cols-3">
        {Array.isArray(data) && data.length>0 ?(
            data.map((item,index)=>(
               <div key={index} onClick={()=>(navigateToMenuListByResturant(item._id))}>
                                {item.name}
               </div>
            ))
        ):(
            <div>
                No data found
            </div>
        )}
        </div>
        
        </>
    );
}

export default Resturant




