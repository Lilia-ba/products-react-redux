import { useCallback, useEffect, useMemo,useState,  } from "react";
import { useDispatch, useSelector } from "react-redux";
import useCategory from "../../hooks/use-category";
import axios from "axios";



const useManageProduct = () => {

    const [showModal,setShowModal] = useState(false);
    const [formData,setFormData] = useState({
        name: '', description: '',price: '', image: null, category: {
                                                                                       
            id: '', name: ''
        }


    });

    const dispatch = useDispatch();
    const categories = useSelector((state) => 
    state.categoryReducer);
    useCategory()

    useEffect(() => {
      if (selectedProduct) {
        setFormData(selectedProduct)
        // setFormData({
        //   name: selectedProduct.name,
        //   description: selectedProduct.description,
        //   price: selectedProduct.price,
        //   image: selectedProduct.image,
        //   category: selectedProduct.category,
        // })
      }
    }, [selectedProduct])
  
    const handleSave = async () => {
  
      const response = await axios.post('https://crudcrud.com/api/54b7434fe7b8437b854d954f91ddf9c4/products', formData);
      if (response.data) {
        dispatch({type: 'ADD_PRODUCT', payload: response.data});
        setFormData({
          name: '', description: '', price: '', image: null, category: ''
        });
        closeModal()
      }
    };
  
    const handleClick = async () => {
      if (selectedProduct) {
        await handleUpdateProduct()
      } else {
        await handleSave()
      }
    }
  
    const handleUpdateProduct = async () => {
      const obj = {...formData}
      delete obj._id
      const result = await axios.put(
        `https://crudcrud.com/api/54b7434fe7b8437b854d954f91ddf9c4/products/${selectedProduct._id}`,
        obj
      );
      dispatch({type: 'UPDATE_PRODUCT', payload: formData});
      setFormData({
        name: '', description: '', price: '', image: null, category: ''
      });
      closeModal()
    }
  
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
      formData,
      categories,
      handleChange,
      handleCategoryChange,
      uploadImage,
      handleClick
    }
  }
  export default useManageProduct



      
       
    


    
    

