import { useSelector } from "react-redux";
import CategoryList from "../category/categoryList";
import Resturant from "../resturant/resturantList";
import {type RootState } from "../../redux/store";
const Home = () => {

    const user = useSelector((state:RootState)=>state.userReducer.user)
    return (
        <>
            <div className="m-auto container">
                {user!=null ?
                <>
                <p>user name:{user.name}</p>
                <p>user name:{user.email}</p>
                </>:
                <div>
                    no user found
                    </div>}
                <CategoryList />
                <Resturant />
            </div>

        </>
    );
}

export default Home