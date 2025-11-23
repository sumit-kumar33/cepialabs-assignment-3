import React, {useState, useEffect} from "react";
import PasswordStrengthBar from "react-password-strength-bar";

function SignUpPage() {
    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [pass, setPass] = useState("");

    const [cpass, setCPass] = useState("");

    const [termsAccepted, setTermsAccepted] = useState(false);
    const [showTermsError, setShowTermsError] = useState(false);
    const [profilePreview, setProfilePreview] = useState(null);
    // track which input currently has the cursor (focused)
    const [nameFocused, setNameFocused] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const [passFocused, setPassFocused] = useState(false);
    const [cpassFocused, setCPassFocused] = useState(false);

    const handleNameChange = (event) =>{setName(event.target.value)};
    const handleEmailChange = (event) =>{setEmail(event.target.value)};
    const handlePassChange = (event) =>{setPass(event.target.value)};
    const handleCPassChange = (event) =>{setCPass(event.target.value)};

    const handleProfileChange = (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setProfilePreview(url);
        } else {
            setProfilePreview(null);
        }
    };

    // revoke object URL when preview changes/unmount
    useEffect(() => {
        const current = profilePreview;
        return () => { if (current) URL.revokeObjectURL(current); };
    }, [profilePreview]);

    // derive validation flags from current state (no setState in effects)
    const flagName = name.trim().length >= 2; // message says at least 2 chars
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const flagEmail = emailRe.test(email);
    const flagPass = pass.length >= 8; // prefer 8+ chars
    const flagConfirm = pass === cpass && cpass.length > 0;
    // keep flagCPass state only if you need to track touched/animation; otherwise use flagConfirm
    // compute submit disabled (true when not ready) -- don't require terms here
    // so user can click Submit and receive the terms error message
    const submitDisabled = !(flagName && flagEmail && flagPass && flagConfirm);

    const handleSubmit = (e) => {
        e && e.preventDefault && e.preventDefault();
        if (!termsAccepted) {
            setShowTermsError(true);
            return;
        }
        // proceed with submission (placeholder)
        console.log('Submitting', { name, email });
        alert('Form submitted');
    };


    return(
        <div>
            <div className="form-fields">
                <p className="form-text">Profile Picture: </p>
                <input className="form-input" type="file" accept="image/*" onChange={handleProfileChange} />
                {profilePreview && <img src={profilePreview} alt="Preview" className="profile-preview" />}
            </div>
            <div className="form-fields">
                <p className="form-text">Name: </p>
                <input
                    className="form-input"
                    value={name}
                    type="text"
                    onChange={handleNameChange}
                    onFocus={() => setNameFocused(true)}
                    onBlur={() => setNameFocused(false)}
                />
            </div>
            {(!flagName && nameFocused) ? <p className="form-error">Name should atleat be 2 character long</p> : ""}

            <div className="form-fields">
                <p className="form-text">Email: </p>
                <input
                    className="form-input"
                    value={email}
                    type="email"
                    onChange={handleEmailChange}
                    onFocus={() => setEmailFocused(true)}
                    onBlur={() => setEmailFocused(false)}
                />
            </div>
            {(!flagEmail && emailFocused) ? <p className="form-error">Enter a valid Email</p> : ""}

            <div className="form-fields">
                <p className="form-text">Password: </p>
                <input
                    className="form-input"
                    value={pass}
                    type="password"
                    onChange={handlePassChange}
                    onFocus={() => setPassFocused(true)}
                    onBlur={() => setPassFocused(false)}
                />
            </div>
            <PasswordStrengthBar className="password-strength-bar" password={pass}/>
            {/* show password-length hint only while focused */}
            {(!flagPass && passFocused) ? <p className="form-error">Password should contain atleast 8 characters.</p> : ""}

            <div className="form-fields">
                <p className="form-text">Confirm Password: </p>
                <input
                    className="form-input"
                    value={cpass}
                    type="password"
                    onChange={handleCPassChange}
                    onFocus={() => setCPassFocused(true)}
                    onBlur={() => setCPassFocused(false)}
                />
            </div>
            {(!flagConfirm && cpassFocused) ? <p className="form-error">Those passwords didn’t match. Try again.</p> : ""}
                        <div className="form-fields">
                                <p className="form-text">Terms: </p>
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    <input
                                        id="terms"
                                        type="checkbox"
                                        checked={termsAccepted}
                                        onChange={(e)=>{ setTermsAccepted(e.target.checked); if (e.target.checked) setShowTermsError(false); }}
                                    />
                                    <label htmlFor="terms" style={{marginLeft: 10, color: '#9fb0c8', fontSize: 14}}>
                                        I agree to the <a href="#" style={{color: '#60a5fa'}}>Terms &amp; Conditions</a>
                                    </label>
                                </div>
                        </div>
                        {(showTermsError && !termsAccepted) ? <p className="form-error">You must accept the terms and conditions.</p> : ""}
            <button type="button" disabled={submitDisabled} onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default SignUpPage;