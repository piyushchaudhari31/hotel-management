import { Link, useNavigate } from "react-router-dom";
import "./register.scss";
import { useFormik } from "formik";
import { ValidationSignup } from '../../../utils/validation/Validation'
import { useDispatch } from "react-redux";
import Img from '../../../assets/image2.png'
import { userRegister } from "../../../store/thunk/AuthThunk";

const Register = () => {

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const { values, handleChange, handleBlur, touched, errors, submitForm } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: ValidationSignup,
    onSubmit: async (values) => {
      const user = {

        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password
      }

      const result = await dispatch(userRegister(user))

      if(userRegister.fulfilled.match(result)){
        navigate('/login')
      }
    },
  });

  return (
    <div className="register">
      <div className="register-left">

        <div className="register-header">
          <span>SIGN UP</span>
          <h1>Create an Account</h1>
          <p>Fill out the form to get started</p>
        </div>

        <div className="register-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="First name *"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.firstName && errors.firstName ? (<p className="error">{errors.firstName}</p>) : null}
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Last name *"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.lastName && errors.lastName ? (<p className="error">{errors.lastName} </p>) : null}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email *"
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
              placeholder="Password *"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.password && errors.password ? (<p className="error">{errors.password}</p>) : null}
          </div>
          <div className="register-bottom">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="login-link"> Login </Link>
            </p>
            <button type="submit" onClick={submitForm}>Sign Up</button>
          </div>
        </div>
      </div>
      <div className="reigster-right">

        <img src={Img} alt="Hotel" />

      </div>

    </div>
  );
};

export default Register;