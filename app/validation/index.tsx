import * as yup from "yup";

const passRule =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const registerSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .matches(
      /@(fpt|fe)\.edu\.vn$/,
      "Email must be from @fpt.edu.vn or @fe.edu.vn"
    )
    .required("This field is required"),
  password: yup
    .string()
    .min(8)
    .matches(passRule, { message: "Please enter a stronger password" })
    .required("This field is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Password must match")
    .required("This field is required"),
});

export const forgotSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .matches(
      /@(fpt|fe)\.edu\.vn$/,
      "Email must be from @fpt.edu.vn or @fe.edu.vn"
    )
    .required("This field is required"),
});

export const resetSchema = yup.object().shape({
  newPassword: yup
    .string()
    .min(8)
    .matches(passRule, { message: "Please enter a stronger password" })
    .required("This field is required"),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), ""], "Password must match")
    .required("This field is required"),
});
export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .matches(
      /@(fpt|fe)\.edu\.vn$/,
      "Email must be from @fpt.edu.vn or @fe.edu.vn"
    )
    .required("This field is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("This field is required"),
});

export const updateInfoSchema = yup.object().shape({
  first_name: yup.string().required("This field is required"),
  last_name: yup.string().required("This field is required"),
  department: yup.string().required("This field is required"),
  major: yup.string().required("This field is required"),
});
