import React, { useEffect, useState } from "react";
import { getProductsAsync, selectProducts} from './productSlice';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserName } from './loginSlice';
import { selectToken } from './loginSlice';
import Button from '@mui/material/Button';
import {Card} from "react-bootstrap";
import { selectLogged } from './loginSlice'
import { Link, useParams } from 'react-router-dom';
import { sendCart,clearAr } from "./OrderSlice";
import {selectorders } from "./OrderSlice";





const Products = () => {
  let params = useParams();
  let id = params.id;
  let loggedIn = useSelector(selectLogged);
  const products = useSelector(selectProducts);
  const userName = useSelector(selectUserName);
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  // const amount = useSelector(selectamount);
  const [myCart, setmyCart] = useState([])
  const [amountCng, setamountCng] = useState(0)
  const myOrders = useSelector(selectorders);

  //run every change in the length of myCart
  useEffect(() => {
    console.table(myCart);
    localStorage.setItem("myCart", JSON.stringify(myCart));
  }, [myCart.length, amountCng]);




  useEffect(() => {
    dispatch(getProductsAsync(token));
  }, []);

  useEffect(() => {
}, [myCart.length, amountCng])


const addToCart = (item) => {
  let temp = myCart.find((x) => x._id === item._id);
  if (temp) {
    temp.amount += item.amount;
    //   console.log(temp);
      setmyCart(myCart);
  
  } else {
    setmyCart([...myCart, item]);
    localStorage.setItem("myCart", JSON.stringify(myCart));
    // dispatch(sendCart(myCart));
  }
  console.table(myCart);
  localStorage.setItem("myCart", JSON.stringify(myCart));
   dispatch(sendCart(myCart));
};

// useEffect(() => {
//   if (localStorage.getItem("myCart"))
//   setmyCart(JSON.parse( localStorage.getItem("myCart") ))
// }, [])



  return (
    <div className="container">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-2">
       {!loggedIn && <div  style={{margin:"50px"}}align="center">Please <Link to="/login">log in</Link> to purchase items</div>}
       <br></br>

       {loggedIn && products.map( prod=> <div>{" "}
       <Card style={{ width:'20rem'}}>
      <Card.Img  width="350px" height="320px" variant="top" src={`http://127.0.0.1:8000/media/${prod.image}`} />
        <Card.Body>
          <Card.Title>{prod.desc} </Card.Title>
          <Card.Text >
          {prod.price}₪
          </Card.Text>
          <Card.Text >
          </Card.Text>
        </Card.Body>
        <Button variant="outlined" onClick={() => addToCart({ _id: prod.id, desc: prod.desc, amount: 1,price:prod.price })}>
        Add to cart
        </Button>
                <Button onClick={() => addToCart({ _id: prod.id, desc: prod.desc, amount: 1,price:prod.price })}>+</Button>
                <div align="center">{}</div>
                <Button onClick={() => addToCart({ _id: prod.id, desc: prod.desc, amount: -1,price:prod.price })}>-</Button>
        </Card>
        </div>)}
        <br></br>
    
    <br></br>
    </div>
    <br></br>
    {loggedIn&&<div>
     <h3 align="center">local storage:<br></br></h3>
    {myCart.map((prod) => (
        <div align="center">
           product:{prod.desc} &nbsp;          amount: {prod.amount}
          </div>))}
{loggedIn && <div align="center">
          <Button variant="outlined" onClick={() => dispatch(sendCart(myCart))}>send to cart</Button>
      {/* <Button variant="outlined" onClick={() => console.table(myCart)}>show cart</Button> */}
    <Button  variant="outlined"onClick={()=>dispatch(clearAr())}>update localStorage</Button>
    </div>}
    </div>}
     </div>
  )
}

export default Products
