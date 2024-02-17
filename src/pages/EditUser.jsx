import {useEffect, useState} from 'react'

import EditForm from '../components/EditForm';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import authService from '../appwrite/auth';

function EditUser() {


  const [user, setUser] = useState({});
  const navigate = useNavigate();
  
  useEffect(() => {
    async function userset(){
      try {
        const userData = await authService.getCurrentUser();
        if (userData) {
          setUser(userData);
          if (window.location.pathname !== '/edit') {
            navigate("/edit");
          }
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    userset();
  }, [navigate]);
  
    


  return (
    <EditForm user={user} />
  )
}

export default EditUser