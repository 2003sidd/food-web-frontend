import img from "../../assets/svg/no-data-found.svg"

const NotFound = () => {
    return (
        <>
            <div className="bg-gray-100 py-8  text-center">
                <img src={img} alt="" />
                <p className="text-2xl font-semibold">Page Not found </p>
            </div>

        </>
    );
}

export default NotFound