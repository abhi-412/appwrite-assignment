import  {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import {Button, Input, } from "./index"
import {useDispatch} from "react-redux"
import authService from "../appwrite/auth"
import {useForm} from "react-hook-form"

export default function EditForm({ user }) {
    
  const {register, handleSubmit} = useForm({
        defaultValues: {
            name: user?.name || "",
            email: user?.email || "",
            phone: user?.phone || "",
            password: ""
        },
    });

    const navigate = useNavigate()
    const [error, setError] = useState("")


    const submit = async (data,e) => {
        e.preventDefault();
            console.log(data.email);
                try {
                    const session = await authService.login(data)
                    if(session){
                        await authService.updatePhone(`+91${data.phone}`,data.password);
                        await authService.updateName(data.name);
                        let newUser = await authService.getCurrentUser();
                        console.log(newUser);
                        navigate('/user')
                    }
                }catch (error) {
                    setError(error.message);
                }
                
            };





    return (
        <div className='w-full h-full flex items-center justify-center bg-gray-400 py-8 '>
            <form onSubmit={handleSubmit(submit)} className="flex lg:w-1/3 md:w-1/2 w-10/12 bg-white p-5 flex-wrap gap-5">
            <div className="flex flex-col w-full gap-4 px-2">

                <div className='flex flex-col gap-2'>
                    <Input
                        label="Email: "
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }
                        })}
                        />
                    </div>


                    <div className='flex flex-col gap-2'>
                    <Input
                        label="Name: "
                        placeholder="Enter your name"
                        type="name"
                        {...register("name", {
                            required: true,
                        })}
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                    <Input
                        label="Phone: "
                        placeholder="Phone no. (Without country code)"
                        type="tel:+91"
                        {...register("phone", {
                            required: true,
                            minLength: {
                                value: 10,
                                message: 'min 10 characters',
                            },
                            maxLength: {
                                value: 10,
                                message: 'max 10 characters',
                            },
                        })}
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                    <Input
                        label="Password: "
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: true,})}
                        />
                    </div>
               
                    {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                   
             </div>
                        
                    <div className='w-full'>
                        <Button type="submit" bgColor={user ? "bg-green-500" : undefined} className="w-full">
                            {user ? "Update" : "Submit"}
                        </Button>
                    </div>
           
        </form>
        </div>
    );
}
