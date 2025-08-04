import React, { useState } from "react";
import { Link } from "react-router-dom";
import { register } from "../../services/AuthService";

const Register: React.FC = () => {

    interface errorType { name?: string, email?: string, password?: string, confirmPassword?: string }


    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState<errorType>({});


    const validateEmail = (email: string) => {
        // A simple email validation regex
        const regex = /\S+@\S+\.\S+/;
        return regex.test(email);
    };

    function checkForm(): Boolean {
        setErrorMessage({})
        let isError = false;
        let error: errorType = {}
        // Validate input fields


        if (!email || !validateEmail(email)) {
            error.email = "Please enter a valid email."
            isError = true
        }

        if (!password || password.length < 6) {
            error.password = "Please enter a valid password."
            isError = true

        }

        if (!confirmPassword || confirmPassword.length < 6) {
            error.confirmPassword = "Please enter a valid confirm Password."
            isError = true

        }

        if (password !== confirmPassword) {
            error.password = "Passwords do not match."
            error.confirmPassword = "Passwords do not match."
            isError = true

        }

        setErrorMessage(error);
        return isError;
    }

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (!checkForm()) {
            const data = await register({email,name,password});
            if(!data.data){
                console.log("user created",data.data)
            }else{
                console.log("user created",data)

            }
        } else {
            console.log("error is", errorMessage)
            alert("Form error")
        }


    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-3xl font-semibold text-center text-gray-700">Register</h2>
                <form className="my-4 space-y-6" onSubmit={handleSubmit}>

                    <label htmlFor="name" className="block mt-2 text-sm mb-1 font-medium text-gray-600">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="my-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {errorMessage.name && <p className="text-md mb-1 text-red-500">{errorMessage.name}</p>}


                    <label htmlFor="email" className="block mt-2 text-sm mb-1 font-medium text-gray-600">
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="my-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {errorMessage.email && <p className="text-md mb-1 text-red-500">{errorMessage.email}</p>}


                    <label htmlFor="password" className="block mt-2 mb-1 text-sm font-medium text-gray-600">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="my-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {errorMessage.password && <p className="text-md mb-1 text-red-500">{errorMessage.password}</p>}


                    <label htmlFor="confirmPassword" className="block mt-2 mb-1 text-sm font-medium text-gray-600">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="my-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {errorMessage.confirmPassword && <p className="text-md mb-1 text-red-500">{errorMessage.confirmPassword}</p>}



                    <div className="flex items-center justify-between mt-4">
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-yellow-400 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            Register
                        </button>
                    </div>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link to="/login" className="text-yellow-500 hover:underline">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
function checkForm() {
    throw new Error("Function not implemented.");
}

