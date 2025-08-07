import type React from "react";
import { getMenuByResturant } from "../../services/JournalService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MenuList from "./menu";
import type MenuInterface from "../../types/MenuInterface";

const MenuByResturant: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [data, setData] = useState<MenuInterface[] | null>(null)

    useEffect(() => {
        console.log("id is", id)
        fetchMenuByResturant()
    }, [])

    async function fetchMenuByResturant() {
        try {
            if (id != null) {

                const data = await getMenuByResturant(id);

                if (data.data && data.data.length > 0) {
                    setData(data.data)
                    console.log("worked well")
                } else {
                    console.log("not working")
                }
            }
        } catch (error) {
            console.log("error")
        }
    }

    return (
        <>
            {
                data != null ?
                    <div>
                        <MenuList list={data} />

                    </div>
                    : <div className="h-80 flex justify-center items-center py-6 text-center text-lg font-bold bg-gray-200">
                        No data found
                    </div>
            }

        </>
    )
};

export default MenuByResturant;