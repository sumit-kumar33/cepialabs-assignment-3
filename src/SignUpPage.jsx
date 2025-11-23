import React, {useState} from "react";
import PasswordStrengthBar from "react-password-strength-bar";

function SignUpPage() {
    const [name, setName] = useState("");
    const [flagName, setFlagName] = useState(true);
    const [email, setEmail] = useState("");
    const [flagEmail, setFlagEmail] = useState(true);
    const [pass, setPass] = useState("");
    const [flagPass, setFlagPass] = useState(true);
    const [cpass, setCPass] = useState("");
    const [flagCPass, setFlagCPass] = useState(true);
    const [submit,setSubmit] = useState(true);

    const handleNameChange = (event) =>{setName(event.target.value)};
    const handleEmailChange = (event) =>{setEmail(event.target.value)};
    const handlePassChange = (event) =>{setPass(event.target.value)};
    const handleCPassChange = (event) =>{setCPass(event.target.value)};

    const checkName = () => name.length >= 1 ? setFlagName(true) : setFlagName(false);
    const checkEmail = () => (email.includes("@") && email.includes(".")) ? setFlagEmail(true) : setFlagEmail(false);
    const checkPass = () => pass.length >= 7 ? setFlagPass(true) : setFlagPass(false);
    const checkCPass = () => pass===cpass ? setFlagCPass(true) : setFlagCPass(false);
    const checkSubmit = () => flagName && flagEmail && flagPass && flagCPass ? setSubmit(false) : setSubmit(true)
    

    return(
        <div>
            <div className="form-fields">
                <p className="form-text">Profile Picture: </p>
                <input className="form-input" type="file" accept="image/*" />
            </div>
            <div className="form-fields">
                <p className="form-text">Name: </p>
                <input className="form-input" value={name} type="name" onChange={(e)=>{handleNameChange(e),checkName(),checkSubmit()}}/>
            </div>
            {flagName? "" : <p className="error">Name should atleat be 2 character long</p>}

            <div className="form-fields">
                <p className="form-text">Email: </p>
                <input className="form-input" value={email} type="email" onChange={(e)=>{handleEmailChange(e),checkEmail(),checkSubmit()}}/>
            </div>
            {flagEmail? "" : <p className="error">Enter a valid Email</p>}

            <div className="form-fields">
                <p className="form-text">Password: </p>
                <input className="form-input" value={pass} type="password" onChange={(e)=>{handlePassChange(e),checkPass(),checkSubmit()}}/>
            </div>
            <PasswordStrengthBar className="password-strength-bar" password={pass}/>
            {/* {flagPass? "" : <p className="error">Password should contain atleast 8 characters.</p>} */}

            <div className="form-fields">
                <p className="form-text">Confirm Password: </p>
                <input className="form-input" value={cpass} type="password" onChange={(e)=>{handleCPassChange(e),checkCPass(),checkSubmit()}}/>
            </div>
            {flagCPass? "" : <p className="error">Those passwords didn’t match. Try again.</p>}
            <button disabled={submit}>Submit</button>
        </div>
    )
}

export default SignUpPage;