import React, { useState, useEffect, useRef } from 'react';

import { ImCancelCircle } from'react-icons/im';
import { BsCheck2Circle } from'react-icons/bs';


const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function Register() {

    const userRef = useRef();
    const errorRef = useRef();

    /* user input */
    const [user, setUser] = useState('');
    const [validUser, setvalidUser] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    /* password input */
    const [pwd, setpwd] = useState('');
    const [validPwd, setvalidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    /* cnfirmed password input */
    const [confirmedPwd, setconfirmedPwd] = useState('');
    const [validconfirmedPwd, setvalidconfirmedPwd] = useState(false);
    const [confirmedPwdFocus, setconfirmedPwdFocus] = useState(false);

    /* error and success */
    const [errMsg, seterrMsg] = useState('');
    const [successLogin, setsuccessLogin] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
      const isUserValid = USER_REGEX.test(user);
      setvalidUser(isUserValid)
    }, [user]);
    
    useEffect(() => {
        const isPwdValid = PWD_REGEX.test(pwd);
        console.log(isPwdValid)
        setvalidPwd(isPwdValid);

        const matchedPwd = pwd === confirmedPwd;
        setvalidconfirmedPwd(matchedPwd);
      }, [pwd, confirmedPwd]);

      /* reset error messages */
      
      useEffect(() => {
        seterrMsg('');
      }, [user, pwd, confirmedPwd])
      
      /* useEffect(() => {console.log(user)},[user]) */
  return (
    <section>
        <p ref={errorRef} className={errMsg ? 'err-msg' : 'off-screen'} aria-live="assertive">{errMsg}</p>
        <h1>Register</h1>
        <form>
            <div className='name-field'>
                <label htmlFor='username'>
                    User name:
                    <span className={validUser ? 'valid' : 'hide'}><BsCheck2Circle /></span>
                    <span className={validUser || !user ? 'hide' : 'invalid' }><ImCancelCircle /></span>
                </label>
                <input 
                    type="text"
                    id="username"
                    autoComplete='off'
                    onChange={(e) => setUser(e.target.value)}
                    required
                    aria-invalid={validUser ? 'false' : 'true'}
                    aria-describedby = 'uidnote'
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                    ref={userRef}
                />
                <p id="" className={userFocus && user && !validUser ? 'instruction' : 'offscreen'}>
                    <span>4 to 24 characters</span>
                </p>
            </div>
            <div className='password-field'>
                <label htmlFor='user-password'>
                    Password: 
                    <span className={validPwd ? 'valid' : 'hide'}><BsCheck2Circle /></span>
                    <span className={validPwd || !pwd ? 'hide' : 'invalid' }><ImCancelCircle /></span>
                </label>
                <input 
                    type="password"
                    id="user-password"
                    autoComplete='off'
                    onChange={(e) => setpwd(e.target.value)}
                    required
                    aria-invalid={validUser ? 'false' : 'true'}
                    aria-describedby = 'uidnote'
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                />
                <p id="" className={pwdFocus && pwd && !validPwd ? 'instruction' : 'offscreen'}>
                    8 to 24 characters. <br />
                    Must include uppercase and lowercase letters, a number and a special character. <br />
                    Allowed special characters:
                    <span aria-label="exclamation mark"> ! </span><span aria-label="at symbol">@ </span>
                    <span aria-label="hashtag"># </span><span aria-label="dollar sign">$ </span>
                    <span aria-label="percent">% </span>
                </p>
            </div>

            <div className='confirmed-password-field'>
                <label htmlFor='confirmed-password'>
                    Confirm Password: 
                    <span className={validconfirmedPwd && confirmedPwd ? 'valid' : 'hide'}><BsCheck2Circle /></span>
                    <span className={confirmedPwd || !validconfirmedPwd ? 'hide' : 'invalid' }><ImCancelCircle /></span>
                </label>
                <input 
                    type="password"
                    id="confirmed-password"
                    autoComplete='off'
                    onChange={(e) => setconfirmedPwd(e.target.value)}
                    required
                    aria-invalid={validconfirmedPwd ? 'false' : 'true'}
                    aria-describedby = 'uidnote'
                    onFocus={() => setconfirmedPwdFocus(true)}
                    onBlur={() => setconfirmedPwdFocus(false)}
                />
                <p id="" className={confirmedPwdFocus && confirmedPwd && !validconfirmedPwd ? 'instruction' : 'offscreen'}>
                    Must match eith the first password.
                    
                </p>
            </div>
        </form>
    </section>
  )
}

export default Register