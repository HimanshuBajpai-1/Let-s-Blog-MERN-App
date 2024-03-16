import React, { useState } from 'react';
import './adminallusers.scss';
import Loader from '../Layout/Loader/Loader';
import { useSelector ,useDispatch} from 'react-redux';
import { MdDelete } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import { GoCircleSlash } from "react-icons/go";
import toast from 'react-hot-toast';
import axios from 'axios';
import {getAllUsersAdmin} from '../../Reducers/AdminReducer/getAllUserAdmin';


const AdminAllUsers = ({setTotalUser}) => {  
  const dispatch = useDispatch();
    const [deleting , setDeleting ] = useState(false);
    const [editingRole , setEditingRole ] = useState(false);

    const {loading:userListLoading , users} = useSelector((state) => state.usersListAdmin);
    
    const deleteHandler = async (id) =>{
      setDeleting(true);
      await axios.delete(`/api/v1/admin/user/${id}`);
      toast.success('User Deleted Successfully');
      const response = await axios.get(`/api/v1/admin/users`);
      dispatch(getAllUsersAdmin(response.data.users));
      setTotalUser(response.data.totalUser);
      setDeleting(false);
    }

    const editRoleHandler = async (id) => {
      try {
        setEditingRole(true);
        await axios.put(`/api/v1/admin/user/${id}`,{role:'Admin'});
        toast.success('Role Updated Successfully');
        const response = await axios.get(`/api/v1/admin/users`);
        dispatch(getAllUsersAdmin(response.data.users));
        setTotalUser(response.data.totalUser);
        setEditingRole(false);
      } catch (error) {
        console.log(error);
        setEditingRole(false);
        toast.error(error?.response?.data?.message || error.message);
      }
    }

    return (
      userListLoading ? users && users.length ? <div className='adminUsersList'>
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Edit Role</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map(i=><tr key={i._id}>
                <td>{i._id}</td>
                <td>{i.name}</td>
                <td>{i.email}</td>  
                <td>{i.role}</td>
                <td>{i.role==='Admin' ? <GoCircleSlash onClick={()=>toast.error('Already Admin...')}/> : editingRole ? <span className='editRole' onClick={()=>toast.error('Processing... Please Wait!!!')}>User <FaArrowRight /> Admin</span> : <span className='editRole' onClick={()=>editRoleHandler(i._id)}>User <FaArrowRight /> Admin</span>}</td>
                <td>{deleting ? <MdDelete onClick={()=>toast.error('Processing... Please Wait!!!')}/> : <MdDelete onClick={()=>deleteHandler(i._id)}/>}</td>
              </tr>)
            }
          </tbody>
        </table>
      </div> : <div className='NoUser'>No User Found</div> : <Loader />
    )
}

export default AdminAllUsers