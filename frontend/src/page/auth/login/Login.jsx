import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { ValidationSignIn } from '../../../utils/validation/Validation'
import Img from '../../../assets/image1.png'
import { useDispatch } from 'react-redux'
import './login.scss'
import { userLogin } from "../../../store/thunk/AuthThunk";
import toast from "react-hot-toast";

const Login = () => {


    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { values, handleChange, handleBlur, touched, errors, submitForm } = useFormik({
        initialValues: {
            email: "",
            password: "",
        },

        validationSchema: ValidationSignIn,

        onSubmit: async (values) => {
            const user = {
                email: values.email,
                password: values.password
            }
            const result = await dispatch(userLogin(user))
            if (userLogin.fulfilled.match(result)) {
                const user = result.payload

                if (user.role === 'Admin') {
                    navigate("/admin-Dashboard")
                }
                else {
                    navigate('/')
                }
            }
        },
    });

    return (
        <div className="login">
            <div className="login-left">

                <div className="login-header">
                    <span>SIGN IN</span>
                    <h1>Welcome Back to REALNEST</h1>
                    <p>Sign-in to Your Account</p>
                </div>

                <div className="login-form">

                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {touched.email && errors.email ? (<p className="error">{errors.email}</p>) : null}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {touched.password && errors.password ? (<p className="error">{errors.password}</p>) : null}
                    </div>
                    <div className="forgot-pswd">
                        <p>Forgot Password?</p>
                    </div>
                    <div className="login-bottom">
                        <p>
                            Create a new Account?{" "}
                            <Link to="/register" className="signUp-link">signup </Link>
                        </p>
                        <button type="submit" onClick={submitForm}>Login</button>
                    </div>
                </div>
            </div>
            <div className="login-right">

                <img src={Img} alt="Hotel" />

            </div>

        </div>
    );
};

export default Login;