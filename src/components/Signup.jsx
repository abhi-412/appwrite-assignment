import {useState} from 'react'
import authService from '../appwrite/auth'
import {Link ,useNavigate} from 'react-router-dom'
import {login} from '../store/authSlice'
import {Button, Input} from './index.js'
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm();

    const create = async(data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(login(userData));
                navigate("/user")
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className="flex items-center h-full w-full justify-center p-5">
            <div className="lg:w-1/3 md:w-1/2 w-10/12 bg-gray-100 rounded-xl p-10 border gap-3 border-black/10">
                <div className='flex flex-col justify-center items-center gap-2 mb-4'>

                    <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                    <p className="mt-2 text-center text-base text-black/60">
                        Already have an account?&nbsp;
                        <Link
                            to="/login"
                            className="font-medium text-primary transition-all duration-200 hover:underline"
                        >
                            Sign In
                        </Link>
                    </p>
                    {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                </div>

                <div className='flex flex-col gap-2'>
                        <form onSubmit={handleSubmit(create)}>
                        <div className='flex flex-col gap-3 mb-3'>
                            <div className=''>
                                <Input
                                label="Name: "
                                placeholder="Enter your full name"
                                {...register("name", {
                                    required: true,
                                })}
                                />
                            </div>
                            <div className=''>
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

                            <div className=''>
                                <Input
                                label="Password: "
                                type="password"
                                placeholder="Enter your password"
                                {...register("password", {
                                    required: true,})}
                                />
                            </div>
                        </div>

                            <div className='mt-2'>
                                <Button type="submit" className="w-full">
                                    Create Account
                                </Button>
                            </div>
                            
                        </form>

                </div>
            </div>

    </div>
  )
}

export default Signup