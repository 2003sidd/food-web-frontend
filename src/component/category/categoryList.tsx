import { useEffect, useRef, useState } from 'react';
import './category.css'
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getAllCategory } from '../../services/JournalService';
import type CategoryInterface from '../../types/Category.interface';
import { useNavigate, useParams } from 'react-router-dom';

const CategoryList = () =>{
      const listRef = useRef<HTMLDivElement | null>(null);
      const [data,setData] = useState<CategoryInterface[]|null>(null)
       const navigate = useNavigate();
const { id } = useParams<{ id: string }>();

      const navigateToMenuListByCategory = (id:string)=>{
          console.log("id is",id)
           navigate(`/MenuByResturant/${id}`);
      }

      const fetchCategory = async () =>{
        try {
          const data = await getAllCategory();
          if(data.data)
            setData(data.data)
        } catch (error) {
          
        }
      }

      useEffect(()=>{
        fetchCategory()
      },[])

  const scrollLeft = () => {
    if (listRef.current) {
      listRef.current.scrollBy({ left: -100, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (listRef.current) {
      listRef.current.scrollBy({ left: 100, behavior: 'smooth' });
    }
  };

    return (
        <>
        <div >
category page
        </div>
        <div className='text-end'>

            <button className="bg-[#dfdfdf] p-1 rounded-4xl cursor-pointer" onClick={scrollLeft }> <ArrowLeft /></button>
            <button className="bg-[#dfdfdf] mx-8 p-1 rounded-4xl cursor-pointer" onClick={scrollRight}><ArrowRight /></button>
        </div>
        <div className="overflow-x-auto scrollbar-none" ref={listRef}>
            <div className="flex whitespace-nowrap gap-2">
                {Array.isArray(data) && data.length>0?(
                  data.map((item,index) =>(
                    <div key={index} onClick={()=>{navigateToMenuListByCategory(item._id)}}>
                      {item.name}
                    </div>
                  ))
                ):(
                  <div>
                    No data found
                  </div>
                )}
                
             
            
            </div>
        </div>
        
        </>
    );
}

export default CategoryList