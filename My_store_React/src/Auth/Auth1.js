import React, { useEffect ,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserProfile from './UserProfile';
//import { loginActions } from './LoginState/loginReduxs';

//import { useDispatch } from 'react-redux';
import './auth.css';
//import { loginSuccess } from './LoginState/LoginState/loginActions';

function Auth1() {
  useEffect(() => {
    const wrapper = document.querySelector('.wrapper');
    const signUpLink = document.querySelector('.signUp-link');
    const signInLink = document.querySelector('.signIn-link');

    const handleSignUpClick = () => {
        wrapper.classList.add('animate-signIn');
        wrapper.classList.remove('animate-signUp');
    };

    const handleSignInClick = () => {
        wrapper.classList.add('animate-signUp');
        wrapper.classList.remove('animate-signIn');
    };

    signUpLink.addEventListener('click', handleSignUpClick);
    signInLink.addEventListener('click', handleSignInClick);

    // إزالة مُستمعي الأحداث عند تفريغ المكون
    return () => {
        signUpLink.removeEventListener('click', handleSignUpClick);
        signInLink.removeEventListener('click', handleSignInClick);
    };
}, []); // [] تأكد من أنها تنفذ مرة واحدة عند تحميل المكون


const navigate = useNavigate();
  const [isLoginActive, setIsLoginActive] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const togglePanel = () => {
    setIsLoginActive(!isLoginActive);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const logData = {
      email: loginData.email,
      password: loginData.password,
    };

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', logData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        const userDataResponse = await axios.get('http://127.0.0.1:8000/api/user', {
          headers: {
            Authorization: `Bearer ${response.data.token}`, // Include the token
            "Content-Type": "application/json",
          },
        });

        //console.log(response.data.token);
        setIsLoggedIn(true);
        setUserData(userDataResponse.data);

        // يمكنك حفظ الـtoken هنا في localStorage إذا كنت تحتاجه في الصفحات الأخرى
        localStorage.setItem('authToken', response.data.token);

        navigate('/product');
      } else {
        alert('فشل تسجيل الدخول');
      }
    } catch (error) {
      console.error('حدث خطأ أثناء تسجيل الدخول: ', error);
      alert('البيانات غير صحيحة');
    }
  };

  if (isLoggedIn) {
    return <UserProfile userData={userData} />;
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    const registrationData = {
      name: registerData.name,
      email: registerData.email,
      password: registerData.password,
      password_confirmation: registerData.password_confirmation,
    };

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register', registrationData, {
        headers: {
          'Accept': 'application/json',
        },
      });

      if (response.status === 200) {
        alert('تم التسجيل بنجاح');
        navigate('/product');
      } else {
        alert('فشل التسجيل');
      }
    } catch (error) {
      console.error('خطأ أثناء التسجيل: ', error);
      alert('حدث خطأ أثناء التسجيل.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (isLoginActive) {
      setLoginData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      setRegisterData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };



    return (
        <div className='full'>

        
        <div className="wrapper body">
            <div className="form-wrapper sign-up">
                <form method='POST' onSubmit={handleRegister}>
                    <h2>Sign Up</h2>
                    <div className="input-group">
                        <input type="text"  value={registerData.name} onChange={handleInputChange} name='name' required />
                        <label for="">Username</label>
                    </div>
                    <div className="input-group">
                        <input type="email"  value={registerData.email} onChange={handleInputChange} name='email' required />
                        <label for="">Email</label>
                    </div>
                    <div className="input-group">
                        <input type="password" value={registerData.password} onChange={handleInputChange} name='password' required />
                        <label for="">Password</label>
                    </div>
                    <div className="input-group">
                        <input type="password" required  value={registerData.password_confirmation} name='password_confirmation' onChange={handleInputChange} />
                        <label for="password_confirmation">Confirm Password</label>
                    </div>
                    <button type="submit" className="btn1">Sign Up</button>
                    <div className="sign-link">
                        <p>Already have an account? <a onClick={togglePanel} href="#" className="signIn-link">Sign In</a></p>
                    </div>
                </form>
            </div>

            <div className="form-wrapper sign-in">
                <form method='post' onSubmit={handleLogin}>
                    <h2>Login</h2>
                    <div className="input-group">
                        <input type="text" name="email" value={loginData.email} onChange={handleInputChange} required />
                        <label for="">Username</label>
                    </div>
                    <div className="input-group">
                        <input type="password" name="password" value={loginData.password} onChange={handleInputChange} required />
                        <label for="">Password</label>
                    </div>
                    <div className="forgot-pass">
                        <a href="#">Forgot Password?</a>
                    </div>
                    <button type="submit" className="btn1">Login</button>
                    <div className="sign-link">
                        <p>Don't have an account? <a  onClick={togglePanel} href="#" className="signUp-link">Sign Up</a></p>
                    </div>
                </form>
            </div>
        </div>
        </div>
    );
}
export default Auth1

