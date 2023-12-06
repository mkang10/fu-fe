import * as yup from "yup";

const passwordRule =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const changePasswordSchema = yup.object().shape({
  currentPassword: yup.string().required("Current password is required"),
  newPassword: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(passwordRule, { message: "Please enter a stronger password" })
    .required("New password is required"),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must match")
    .required("Confirm new password is required"),
});

export const generalInformationSchema = yup.object().shape({
  firstName: yup.string().required("Fist name is required"),
  lastName: yup.string().required("Last name is required"),
  position: yup.string().required("Position is required"),
  department: yup.string().required("Department is required"),
  major: yup.string().required("Major is required"),
  joinDate: yup.string(),
});
