import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { doSigninAsync, selectEmail,selectUserName,selectToken, doSignupAsync } from './loginSlice'

const Registration = () => {
    const dispatch = useDispatch();
    const email = useSelector(selectEmail);
    const userName = useSelector(selectUserName);
    const token = useSelector(selectToken);
    const [newUserName, setNewUserName] = useState("")
    const [newPwd, setNewPwd] = useState("")
    const [confPWD, setconfPWD] = useState("")
    const [newEmail, setNewEmail] = useState("")
    // const disp =() => {
    //      let f1 = dispatch(doSignupAsync({ username: newUserName, password: newPwd, email: newEmail }));
    //     let f2 = dispatch(doSigninAsync({ username: newUserName, password: newPwd }));
    // }
    


  return (
    <div align="center">
        
            <hr />
            <form align="center">
            
            Username <br></br>  <input  placeholder="Enter Username" onChange={(e) => setNewUserName(e.target.value)} /><br></br>
            Password <br></br> <input  placeholder="Enter Password"onChange={(e) => setNewPwd(e.target.value)} type='password' /><br></br>
            Confirm password <br></br> <input placeholder="Confirm Password" onChange={(e) => setNewPwd(e.target.value)} type='password' /><br></br>
            Email <br></br> <input placeholder="Enter Email" onChange={(e) => setconfPWD(e.target.value)} /><br></br>
            {!token && <button onClick={() => dispatch(doSignupAsync({ username: newUserName, password: newPwd, email: newEmail }),doSigninAsync({ username: newUserName, password: newPwd }))}>Register</button>}
            </form>
        </div>
  )
}

export default Registration