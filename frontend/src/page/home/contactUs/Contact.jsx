import "../contactUs/contact.scss";
import { useFormik } from "formik";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock
} from "react-icons/fa";
import { contactUsValidation } from "../../../utils/validation/Validation";
import { Button } from "antd";

const ContactUs = () => {
  const { values, handleChange, handleBlur,touched,errors,submitForm,resetForm} = useFormik({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    },
    validate: contactUsValidation,

    onSubmit: async (values) => {
      console.log(values);
      resetForm();
    }
  });

  return (
    <div className="contactPage">
      <section className="contactHero">
        <div className="overlay">
          <p className="smallTitle">GET IN TOUCH</p>
          <h1>Contact Us</h1>
          <p>We are always ready to help you plan your perfect stay.</p>
        </div>
      </section>

      <section className="contactSection">
        <div className="contactInfo">
          <p className="smallTitle">REALNET LUXURY HOTEL</p>
          <h2>Feel free to contact us</h2>
          <p className="desc">
            Have questions about rooms, booking, or services? Send us a message
            and our team will contact you shortly.
          </p>

          <div className="infoBox">
            <FaMapMarkerAlt />
            <span>RealNet Luxury Hotel, Mumbai, India</span>
          </div>

          <div className="infoBox">
            <FaPhoneAlt />
            <span>+91 98765 43210</span>
          </div>

          <div className="infoBox">
            <FaEnvelope />
            <span>help@realnet.com</span>
          </div>

          <div className="infoBox">
            <FaClock />
            <span>24/7 Customer Support</span>
          </div>
        </div>

        <form className="contactForm">
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.name && errors.name ? (
              <p className="error">{errors.name}</p>
            ) : null}
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.email && errors.email ? (
              <p className="error">{errors.email}</p>
            ) : null}
          </div>

          <div className="form-group">
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={values.subject}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.subject && errors.subject ? (
              <p className="error">{errors.subject}</p>
            ) : null}
          </div>

          <div className="form-group">
            <textarea
              name="message"
              placeholder="Your Message"
              value={values.message}
              onChange={handleChange}
              onBlur={handleBlur}
            ></textarea>
            {touched.message && errors.message ? (
              <p className="error">{errors.message}</p>
            ) : null}
          </div>

          <Button type="button" className="send-btn" onClick={submitForm}>
            SEND MESSAGE
          </Button>
        </form>
      </section>
    </div>
  );
};

export default ContactUs;