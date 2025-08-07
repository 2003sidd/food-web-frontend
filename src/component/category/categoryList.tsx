import { useEffect, useRef, useState } from 'react';
import './category.css'
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getAllCategory } from '../../services/JournalService';
import type CategoryInterface from '../../types/Category.interface';
import { useNavigate } from 'react-router-dom';
import img from "../../assets/image/default-food-img.jpg"
const CategoryList = () => {
  const listRef = useRef<HTMLDivElement | null>(null);
  const [data, setData] = useState<CategoryInterface[] | null>(null)
  const navigate = useNavigate();

  const navigateToMenuListByCategory = (id: string) => {
    console.log("id is", id)
    navigate(`/MenuByCategory/${id}`);
  }

  const fetchCategory = async () => {
    try {
      const data = await getAllCategory();
      if (data.data)
        setData(data.data)
    } catch (error) {

    }
  }

  useEffect(() => {
    fetchCategory()
  }, [])

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

      <div className='text-end'>

        <button className="bg-[#dfdfdf] p-1 rounded-4xl cursor-pointer" onClick={scrollLeft}> <ArrowLeft /></button>
        <button className="bg-[#dfdfdf] mx-8 p-1 rounded-4xl cursor-pointer" onClick={scrollRight}><ArrowRight /></button>
      </div>
      <div className="overflow-x-auto scrollbar-none" ref={listRef}>
        <div className="flex whitespace-nowrap gap-4">
          {Array.isArray(data) && data.length > 0 ? (
            data.map((item, index) => (
              
                <div key={index} className='flex flex-col items-center gap-4  flex-shrink-0 px-2 py-4' onClick={() => { navigateToMenuListByCategory(item._id) }}>
                  <img className="rounded-full h-35 w-30 object-cover"
                    src={item.image || img}
                    alt="category image"
                  />
                  {item.name}
                </div>
              
            ))
          ) : (
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