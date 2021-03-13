import React,{useState, useEffect} from 'react';
import {Link, Redirect} from 'react-router-dom';
import './LoginBox.modules.scss';
import axios from 'axios';
import Check from '@material-ui/icons/Check';
import Close from '@material-ui/icons/Close';
import Modal from '@material-ui/core/Modal';
const LoginBox = () => {
    const [actionType, setActionType] = useState("login");

    const [loginMail, setLoginMail] = useState("");
    const [loginPass, setLoginPass] = useState("");
    const [loginErr, setLoginErr] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(false);
    
    const [registerMail, setRegisterMail] = useState("");
    const [registerPass, setRegisterPass] = useState("");
    const [registerPassRepeat, setRegisterPassRepeat] = useState("");
    const [registerErr, setRegisterErr] = useState(false);
    const [registerSuccess, setRegisterSuccess] = useState(false);

    const [secureDataStrength, setSecureDataStength] = useState({
        passwordLength: false,
        correctMail: false,
        passwordContainsNumber: false,
        repeatedTheSame: false
    })

    const handleRegisterValidation = () => {
     
//TODO: REFAC
        registerPass === registerPassRepeat ?  setSecureDataStength(prevState => ({
            ...prevState,
            repeatedTheSame: true
        })) : setSecureDataStength(prevState => ({ ...prevState,
            repeatedTheSame: false}));

            registerPass.length >= 7 ? setSecureDataStength(prevState => ({
                ...prevState,
                 passwordLength: true
            })) : setSecureDataStength(prevState => ({ ...prevState,
                passwordLength: false}));
            
            registerPass.length >= 7 ? setSecureDataStength(prevState => ({
                    ...prevState,
                     passwordLength: true
                })) : setSecureDataStength(prevState => ({ ...prevState,
                    passwordLength: false}));

            /\d/.test(registerPass) ? setSecureDataStength(prevState => ({
                ...prevState,
                 passwordContainsNumber: true
            })) : setSecureDataStength(prevState => ({ ...prevState,
                passwordContainsNumber: false}));

            const mailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            mailRegex.test(registerMail.toLowerCase()) ? setSecureDataStength(prevState => ({
                ...prevState,
                 correctMail: true
            })) : setSecureDataStength(prevState => ({ ...prevState,
                correctMail: false}));
    }


    const handleSubmitRegister = () => {
        handleRegisterValidation();
        const validationResult = Object.values(secureDataStrength).every(el => el === true);
        if(!validationResult){
            setRegisterErr(true);
            return;
        }
          
        const body = {
            mail: registerMail,
            password: registerPass
        }

        axios
        .post("/api/register", body)
        .then(res => {
            console.log(res);
            console.log(res.data.role);
            setRegisterSuccess(true);
            setRegisterErr(false);
      
        })
        .catch(err => {
            console.log(err);
            setRegisterErr(true);
            setRegisterSuccess(false);
        });
    }
    const handleSubmitLogin = () => {
        const body = {
            mail: loginMail,
            password: loginPass
        }
        axios
        .post("/api/login", body)
        .then(res => {
            console.log(res);
            console.log(res.data.role);
            localStorage.setItem("role", res.data.role);
            localStorage.setItem("mail",res.data.mail);
            setLoginErr(false);
            setLoginSuccess(true);
           // window.location.reload();
        })
        .catch(err => {
            console.log(err);
            setLoginErr(true);
            setLoginSuccess(false);
        });
      
    }
    const loginBox =  
    <div className="login__box">
        <h3>Formularz logowania</h3>
        <label for="loginmail" >E-mail:</label>
        <input type="text" name="loginmail" onChange={(e)=> setLoginMail(e.target.value)}/>
        <label for="loginpass">Password:</label>
        <input type="password" name="loginpass" onChange={(e)=>setLoginPass(e.target.value)}/>
        <button className="btn-submit" onClick={(e)=> handleSubmitLogin()}> Login</button>
        {loginErr ? <div className="err">Incorrect e-mail or password</div> : null}
        <button className="btn-redirect" onClick={(e)=> setActionType("register")}>No account? Register here!</button>
    </div>

const registerBox = 
    <div className="register__box">
        <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        open={registerSuccess}
        setOpen={setRegisterSuccess}
        >
            <>
            <div className="modal__box">
                <div className="modal__codebox">
                <p className="modal__json">Succesfully registered</p>
                </div>
                <button onClick={e=>window.location.reload()}>Zaloguj się</button>
                {/* <button className="modal__exit" onClick={(e) => setModalOpen(false)}>Close</button> */}
            </div>
       
        </>
        </Modal>
        <h3>Formularz rejestracji</h3>
        <label for="regismail">E-Mail:</label>
        <input type="text" name="regismail" onChange={(e) => setRegisterMail(state => e.target.value)}/>
        <label for="regispass">Password:</label>
        <input type="password" name="regispass" value={registerPass} onChange={e => setRegisterPass(state => e.target.value)}/>
        <label for="regispassrepeat">Repeat password:</label>
        <input type="password" name="regispassrepeat" onChange={(e) => setRegisterPassRepeat(state => e.target.value)}/>
        <button className="btn-submit" onClick={(e)=> handleSubmitRegister()}> Register</button>
        <div className="validation__list">
            <div className="validation__item">
                {secureDataStrength.repeatedTheSame ? <Check  className="suc" /> : <Close  className="fail"/>}
                <p>Password and repeated password must be the same</p>
            </div>
            <div className="validation__item">
                {secureDataStrength.passwordContainsNumber ? <Check className="suc" /> : <Close className="fail" />}
                <p>Atleast 1 number used in password</p>
            </div>
            <div className="validation__item">
                {secureDataStrength.passwordLength ? <Check  className="suc"/> : <Close className="fail" />}
                <p>Password must be at least 7 characters long</p>
            </div>
            <div className="validation__item">
                {secureDataStrength.passwordLength ? <Check  className="suc" /> : <Close className="fail"/>}
                <p>Password must be at least 7 characters long</p>
            </div>
            <div className="validation__item">
                {secureDataStrength.correctMail ? <Check  className="suc"/> : <Close className="fail" />}
                <p>Mail has to be in correct format</p>
            </div>
            
        </div>
        {registerSuccess ? <div className="success">Succesfully registered, u can login now!</div> : null}
        {registerErr ? <div className="err">Registration failed. Try again. </div> : null}
        <button className="btn-redirect" onClick={(e)=> setActionType("login")}> Already registered? Login now!</button>
   
 </div>
    return ( 
       
        <section className="login">
            {loginSuccess ? <Redirect to="/"/> : null}
            {actionType === "login" ? loginBox : null}
            {actionType === "register" ? registerBox : null}
      
        </section>
    );
}
 
export default LoginBox;