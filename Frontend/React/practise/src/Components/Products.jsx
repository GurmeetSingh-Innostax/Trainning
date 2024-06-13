import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
//import { actionCreators } from 'State/index';
const Products=()=>{
  const [itemCount, setItemCount] = useState(0);

  const handleAddToCart = () => {
    setItemCount(itemCount + 1);
   // dispatch(actionCreators.Increment(1));
  };
 const  handleRemoveFromCart=()=>{
  setItemCount(itemCount - 1);
  //dispatch(actionCreators.Decrement(1));

 }
  
  //const dispatch=useDispatch();

 
    return(
        <div>
        <img src="coffee-image.jpg" alt="Coffee" width="200" height="200" /><br></br>
        <button onClick={handleRemoveFromCart}>Decrement </button>
        <button >Add to Cart </button>
        <button onClick={handleAddToCart}>Increment </button> <br></br>
        <br></br>
    
        <span>Count: {itemCount}</span> 

        </div>
    )
}

export default Products;

// <button onClick={handleAddToCart}>Add to Cart</button>
{/* <span>Count: {itemCount}</span> */}