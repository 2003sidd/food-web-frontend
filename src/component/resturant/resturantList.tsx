import { useEffect, useState } from "react";
import { getAllResturant } from "../../services/JournalService";
import type ResturantInterface from "../../types/Resturant.interface";
import { useNavigate } from "react-router-dom";
import img from "../../assets/image/default-food-img.jpg"

const Resturant = () => {

  const [data, setData] = useState<ResturantInterface[] | null>(null)
  const navigate = useNavigate();


  const navigateToMenuListByResturant = (id: string) => {
    console.log("id is", id)
    navigate(`/MenuByResturant/${id}`);
  }



  const fetchCategory = async () => {
    try {
      const data = await getAllResturant();
      if (data.data)
        setData(data.data)
    } catch (error) {

    }
  }

  useEffect(() => {
    fetchCategory()
  }, [])

  return (
    <>
      <div className="my-8 overflow-x-auto scrollbar-none" >
        <div className="flex whitespace-nowrap gap-4 flex-grow-0 ">
          {Array.isArray(data) && data.length > 0 ? (
            data.map((item, index) => (
              <div key={index} className="rounded-2xl overflow-hidden border-1 flex-shrink-0 border-gray-200" onClick={() => (navigateToMenuListByResturant(item._id))}>

                <img className="w-full h-40" src={item.image || img} alt="" />
                <div className="p-4 text-wrap">
                  <p className="font-semibold text-lg m-0">
                    {item.name}
                  </p>
                 
                  <p className="mt-2 text-md text-wrap">
                    {item.address}


                  </p>
<p className="text-md font-semibold">
                    {item.phone_number}
                    </p>

                </div>

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

export default Resturant




