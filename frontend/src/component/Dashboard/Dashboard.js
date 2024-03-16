import React, { useEffect, useState } from 'react';
import './dashboard.scss';
import AdminAllUsers from '../AdminAllUsers/AdminAllUsers';
import AdminAllBlogs from '../AdminAllBlogs/AdminAllBlogs';
import Loader from '../Layout/Loader/Loader';
import {useSelector , useDispatch} from 'react-redux';
import toast from 'react-hot-toast';
import axios from 'axios';
import {getAllUsersAdmin} from '../../Reducers/AdminReducer/getAllUserAdmin'
import {useNavigate} from 'react-router-dom'

const Dashboard = () => { 
        const [currentBtn , setCurrentBtn] = useState(true);
        const dispatch = useDispatch(); 
        const navigate = useNavigate();
        const [loading ,setLoading ] = useState(true);
        const [totalUser , setTotalUser ] = useState(0);

        const {loading:userLoading , isAuthenticated ,isAdmin} = useSelector((state)=>state.userDetails); 
        
        useEffect(()=>{
            if(userLoading && !isAuthenticated){
                toast.error('Not Authenticated');
                navigate('/login');                
            }
            if(userLoading && isAuthenticated && !isAdmin){
                toast.error('Only Admin is Allowed to access this resource');
                navigate('/account');                
            }
            if(userLoading && isAuthenticated && isAdmin){
                const fetchData = async ()=>{
                    try {
                        const response = await axios.get(`/api/v1/admin/users`);
                        dispatch(getAllUsersAdmin(response.data.users));
                        setTotalUser(response.data.totalUser);
                    } catch (error) {
                        toast.error(error?.response?.data?.message || error.message);
                    }
                }
                fetchData();
                setLoading(true);              
            }            
        },[dispatch,isAdmin,isAuthenticated,navigate,userLoading])

  return (
    <>  
        {
            loading ? <div className='dashboardConatiner'>
                <div className='circleDiv'>
                    <div className='users circle'><span>Users</span><span>{totalUser}</span></div>
                    <div className='blogs circle'><span>Blogs</span><span>{10000}</span></div>
                </div>
                <div className='buttons'>
                    <button className={currentBtn ? 'active' : ''} onClick={()=>setCurrentBtn(true)}>Users</button>
                    <button className={currentBtn ? '' : 'active'} onClick={()=>setCurrentBtn(false)}>Blogs</button>
                </div>
                {
                    currentBtn ? <AdminAllUsers setTotalUser={setTotalUser}/> : <AdminAllBlogs />
                }
            </div> : <Loader />
        }
    </>
  )
}

export default Dashboard