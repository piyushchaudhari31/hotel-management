import * as Yup from 'yup'

export const ValidationSignup = Yup.object({
    firstName: Yup.string().min(2).max(25).required("FirstName is required"),
    lastName: Yup.string().min(2).max(25).required("LastName is required"),
    email: Yup.string().email().required("Email is required"),
    password: Yup.string().min(5).max(10).required("Password is required")
})
export const ValidationSignIn = Yup.object({
    email: Yup.string().email().required("Please Enter Your Email"),
    password: Yup.string().min(5).max(10).required("Please Enter Your Password")
})

export const contactUsValidation = Yup.object({
    name: Yup.string().min(2).max(25).required("FirstName is required"),
    subject: Yup.string().min(2).max(25).required("FirstName is required"),
    email: Yup.string().email().required("Please Enter Your Email"),
    password: Yup.string().min(5).max(10).required("Please Enter Your Password")
})


export const settingCustomerValidation = Yup.object({
    phone: Yup.string()
        .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
        .required("Phone number is required"),

    idProofNumber: Yup.string()
        .matches(/^[0-9]{12}$/, "ID Proof Number must be 12 digits")
        .required("ID Proof Number is required"),

    gender: Yup.string()
        .required("Gender is required"),

    address: Yup.string()
        .min(5, "Address is too short")
        .required("Address is required"),

    // oldPassword: Yup.string()
    //     .min(6, "Old password must be at least 6 characters"),

    // newPassword: Yup.string()
    //     .min(6, "New password must be at least 6 characters"),

    // confirmPassword: Yup.string().when("newPassword", {
    //     is: (val) => val && val.length > 0,
    //     then: (schema) =>
    //         schema
    //             .required("Confirm password is required")
    //             .oneOf([Yup.ref("newPassword")], "Passwords must match"),
    // }),
});
export const RoomValidation = Yup.object({
    address: Yup.string().min(10).max(50).required("Address is required"),
    phone: Yup.string().matches(/^[0-9]{10}$/, "Phone number must be 10 digits").required("Phone number is required"),
    idProofNumber: Yup.string().matches(/^[0-9]{12}$/, "Value must be 12 digits").required("Value is required"),
})