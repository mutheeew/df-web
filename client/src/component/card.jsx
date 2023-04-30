import React, {useState, useEffect, useContext} from "react";
import { Link } from "react-router-dom";
import {useQuery, useMutation} from 'react-query';
import {API} from '../config/api';
import DeleteData from "./modals/DeleteData";
import {useNavigate} from 'react-router';
import Swal from 'sweetalert2'
import { UserContext } from "../context/user";

const Card = ({id, title, year, imageUrl}) => {
  const navigate = useNavigate();
  const [state] = useContext(UserContext)
  const [changeUrl, setChangeUrl] = useState("play")
  console.log(state.user.role, "jeri ga pernah mandi")
  
  useEffect(() => {
    
    if (state?.user.role === 'admin') {
      setChangeUrl("play-admin")
    }
   
  }, [])
  
  const deleteById = useMutation(async (id) => {
    try{
     
          await API.delete(`/film/${id}`);
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
      
    } catch (error){
      console.log(error);
      // console.log("ini id mute error: ", id)
    }
  });

  return (
    <div>
      <Link to={`/${changeUrl}/${id}`} style={{ textDecoration: "none" }}>
        <div className="bg-black px-2">
          <img src={imageUrl} alt="Card" />
            <div className="text-white" >{title}</div>
            <p className="text-secondary">{year}</p>
            </div>
        {state.isLogin && state.user.role==='admin' &&(
        <div className="d-flex justify-content-around">
          <button onClick={() => {deleteById.mutate(id);}} className="btn btn-danger px-3" >Delete</button>
          <Link className="btn btn-danger px-3" to={`/update-film/${id}`}>Update</Link>
        </div>
        )}
      </Link>
    </div>
  );
};

export default Card;
