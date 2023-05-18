import { useState } from "react";
const useToken = () => {
    const [token,setTokenData]= useState()
    return {token,setTokenData}
}
export default useToken;