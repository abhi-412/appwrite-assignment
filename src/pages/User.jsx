import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import authService from "../appwrite/auth"
import { Button, Container } from "../components";

import { useSelector } from "react-redux";

export default function User() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function getProfile(){
            let userData = await authService.getCurrentUser();
           
            if (userData) {
                setUser(userData);
            } else{
                console.log("navigated");
                navigate("/");
            } 
        }
        getProfile();
    }, [navigate]);

    return user ? (
        <div className="w-full h-full flex justify-center items-center">
            <Container>
                <div className="w-full flex justify-center items-center">
                <div className="w-2/3 bg-white p-5">
                        <div className="w-full flex flex-col justify-center gap-3 mb-6">
                            <h1 className="text-3xl font-bold">Your Details</h1>
                        </div>
                        <div className="details flex justify-center gap-2">
                            <div className="name flex flex-col gap-3">
                                {user.name && <h1 className="name text-xl text-gray-600"><span className="text-gray-500 font-bold">Your Name -</span> {user.name}</h1>}
                                {user.email && <h1 className="name text-xl text-gray-600"><span className="text-gray-500 font-bold">Your Email -</span> {user.email}</h1>}
                                {user.phone ? <h1 className="name text-xl text-gray-600"><span className="text-gray-500 font-bold">Your Phone -</span> {user.phone ? user.phone : "Not Present"}</h1>:"Edit to save your phone"}
                            </div>
                        </div>

                        <div className="w-full m-3">
                            <Link to={'/edit'}>
                                <Button bgColor="bg-green-500" className="w-2/3">
                                    Edit
                                </Button>
                            </Link>
                        </div>
                </div>
                    
            </div>
               
            </Container>
        </div>
    ) : null;
}
