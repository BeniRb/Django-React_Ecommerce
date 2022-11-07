import React, { useEffect,useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { selectorders, sendordersAsync } from './OrderSlice'
import { selectToken, selectLogged } from './loginSlice'
import { Link,useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { delProduct } from './productsAPI';
import { sendCart } from './OrderSlice';

const Cart = () => {

  const notify = () => toast.success("order complete");
  let loggedIn = useSelector(selectLogged);
  const myOrders = useSelector(selectorders);
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const [myCart, setmyCart] = useState(useSelector(selectorders))
  const [totall, settotall] = useState(0)
  const sumTotal =() =>{
    let i=0;
    let counter=0;
    let total=0;
    while (i< myOrders.length) {
      counter=myOrders[i].amount * myOrders[i].price;
      total += counter;
      i++;
    }
    settotall(total)
  }
  useEffect(() => {
    setmyCart(JSON.parse( localStorage.getItem("myOrders") ))
  }, [])
  useEffect(() => {
    sumTotal();

  }, [myOrders.length])

  const sendorder = () =>{
    dispatch(sendordersAsync({ myOrders, token }));
  }

  const cleanarray = () => {
      myOrders = [];
  }
  const DelFromCart = async(id,num) => {
    if(num <=1){
      await setmyCart(myOrders.filter(x => x._id !== id))
      dispatch(sendCart(myOrders.filter(x => x._id !== id)))
      console.table(myOrders.filter(x => x._id !== id))
      localStorage.setItem("myOrders", JSON.stringify(myOrders.filter(x => x.id !== id)))
    }
    else{
      // decrease amount by 1 and not delete the whole row
      await setmyCart(myOrders.filter(x => x._id !== id))
      dispatch(sendCart(myOrders.filter(x => x._id !== id)))
      console.table(myOrders.filter(x => x._id !== id))
      localStorage.setItem("myOrders", JSON.stringify(myOrders.filter(x => x.id !== id)))

    }
}
  useEffect(() => {
    setmyCart(JSON.parse(localStorage.getItem("myOrders") ))
  }, [])

  return (

    <div align="center">
      {loggedIn &&<div>
      {/* {myOrders && myOrders.length} */}     
      <table style={{border:"1px solid black",fontFamily:"arial",borderCollapse: "collapse",width:"70%",height:"60%",margin:"20px"}}>
  <tr>
    <th>Product </th>
    <th>Price</th>
    <th>Amount</th>
  </tr>
  {myOrders.map(prod =><tr>
    <td>{prod.desc}</td>
    <td>{prod.price}₪</td>
    <td>{prod.amount}</td>
    <td><Button onClick={() => DelFromCart(prod._id,prod.amount)}>Delete</Button></td>
    {/* <td><button onClick={() => {DelFromCart(prod._id)}}>delete</button></td> */}
    </tr>)}
</table>

<h3 align="center">Total amount:{totall}₪</h3>

      {token &&<div>
        <div align="center">
{/* <form>
     <h2>Credit card checkout</h2>
     <h6>Cardholder's Full Name:</h6>
     <input label="Cardholder's Name" type="text" placeholder="Cardholder's name" /><br></br><br></br>
     <input label="Card Number" type="number" name="card_number" placeholder='Card Number' imgSrc="https://seeklogo.com/images/V/visa-logo-6F4057663D-seeklogo.com.png" /><br></br><br></br>
          <input label="Expiration Date" type="month" name="exp_date" placeholder='Expiration Date' />{" "}
          <input label="CVV" type="number" name="cvv" placeholder='CVV' />

      <Button text="Place order" />
      </form> */}

 </div>
        <Button variant='outlined' onClick={() =>{notify();sendorder();setTimeout(function() {window.location.replace('/home');}, 2000)}}>Make order</Button>
        </div>}
        <ToastContainer  position="bottom-center" autoClose={1000} />
        {/* <button onClick={() => console.table(myOrders)}>show MyOrders</button></div>} */}
       
       {!token &&
        <div>You need to <Link to="/login">login</Link> first</div>
      }
      </div>}
    </div>
  )
}

export default Cart