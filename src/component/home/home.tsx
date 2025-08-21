import { useSelector } from "react-redux";
import CategoryList from "../category/categoryList";
import Resturant from "../resturant/resturantList";
import { type RootState } from "../../redux/store";
import { use, useEffect } from "react";
const Home = () => {

    const user = useSelector((state: RootState) => state.userReducer.user)

    useEffect(() => {
        console.log("user is", user)
    }, [])
    return (
        <>

            <CategoryList />
            <Resturant />


        </>
    );
}

export default Home