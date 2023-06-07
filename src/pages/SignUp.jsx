import React,{useState} from 'react'
import '../stylesheets/signin.scss'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUp() {

  const navigate = useNavigate();


  const [inputValues, setInputValues] = useState({
    email: '', password: ''
  });
  
  const handleOnChange = event => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

   const handleSubmit = (e) => {
    e.preventDefault();
    console.log({inputValues});
    axios.post('http://localhost:3001/admin/signUp', inputValues)
    .then(res => {
      console.log(res.data);
      navigate('/')
    })
    .catch(err => {
      console.log(err);
      navigate('/signup')
    })
  }
  return (
    <>
      <div className="header">
        <h1>SignUp</h1>
      </div>
      <div className="userInput">
        <input type="text" name="email" placeholder='email' onChange={handleOnChange} />
        <input type="text" name="password" placeholder='password' onChange={handleOnChange}  />
      </div>
      <div className="submitButton">
        <button onClick={handleSubmit}>sign up</button>
      </div>
    </>
  )
}

export default SignUp