import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

const useCategory = () => {
  
    const dispatch = useDispatch()

        useEffect(() =>  {
    
        const fetchCategories = async () => {
            const response = await axios.get('https://crudcrud.com/api/54b7434fe7b8437b854d954f91ddf9c4/categories');
            dispatch({type: 'FETCH_CATEGORIES', payload: response.data});
          };
          fetchCategories();
        }, [dispatch])


    
}
export default useCategory