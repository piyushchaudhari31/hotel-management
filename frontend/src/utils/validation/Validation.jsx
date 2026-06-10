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
});
export const RoomValidation = Yup.object({
    address: Yup.string().min(10).max(50).required("Address is required"),
    phone: Yup.string().matches(/^[0-9]{10}$/, "Phone number must be 10 digits").required("Phone number is required"),
    idProofNumber: Yup.string().matches(/^[0-9]{12}$/, "Value must be 12 digits").required("Value is required"),
})

export const roomValidationSchema = Yup.object({
  roomNumber: Yup.string()
    .required("Room number is required")
    .max(7, "Room number must be maximum 7 characters"),

  description: Yup.string()
    .required("Description is required")
    .min(20, "Description must be at least 20 characters"),

  roomType: Yup.string()
    .required("Room type is required")
    .oneOf(["single", "double"], "Invalid room type"),

  price: Yup.number()
    .required("Price is required")
    .positive("Price must be greater than 0"),

  totalMember: Yup.number()
    .required("Total members is required")
    .oneOf([2, 4], "Total members must be 2 or 4"),

  status: Yup.string()
    .required("Status is required")
    .oneOf(["available", "maintenance"], "Invalid status"),

  
});