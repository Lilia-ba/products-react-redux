import { useCallback, useEffect, useMemo,useState,  } from "react";
import { useDispatch, useSelector } from "react-redux";
import useCategory from "../../hooks/use-category";
import axios from "axios";



const useManageProduct = () => {
    const [showModal,setShowModal] = useState(false);
    const [formData,setFormData] = useState({
        name: '', description: '',price: '', image: null, category: {
        id: '', name: ''
        },
      });

    const dispatch = useDispatch();
    const categories = useSelector((state) => 
    state.categoryReducer);
    useCategory()

    const handleSave = async () => {
      const response = await axios.post('https://crudcrud.com/api/54b7434fe7b8437b854d954f91ddf9c4/products', formData);
      if (response.data) {
        dispatch({type: 'ADD_PRODUCT', payload: response.data});
        setFormData({
          name: '', description: '', price: '', image: null, category: ''
        });
        setShowModal(false);
      }
  
    };
  
    const handleChange = (e) => {
      const {name, value} = e.target;
      setFormData((prevFormData) => ({
        ...prevFormData, [name]: value
      }));
    };
  
    const uploadImage = (event) => {
      const reader = new FileReader();
      reader.onload = function () {
        setFormData({...formData, image: reader.result})
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  
    const handleCategoryChange = (e) => {
      categories.forEach(x => {
        if (x._id === e.target.value) {
          setFormData({...formData, category: {id: x._id, name: x.name}})
        }
      })
    };
  
    return {
      showModal,
      setShowModal,
      formData,
      categories,
      handleSave,
      handleChange,
      handleCategoryChange,
      uploadImage
    }
  }
  export default useManageProduct
   
     
  
   
   
   
 


      
       
    


    
    

