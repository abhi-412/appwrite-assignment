import {useEffect, useState} from 'react'

import EditForm from '../components/EditForm';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

function EditUser() {
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        if (userData) {
            setUser(userData);
        } else navigate("/login");
    }, [user,navigate, userData]);


  return user ? (
    <EditForm user={user} />
  ) : null
}

export default EditUser