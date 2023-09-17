import axios from "axios";
import { toast } from "react-toastify";

export const changePasswordInDb = async (
  user,
  newPassword,
  currentPassword,
  setModalOpen,
  setPasswords,
  setErrors
) => {
  try {
    const response = await axios.post(
      "https://surveyblitz-api.onrender.com/admin/changePassword",
      {
        email: user.result.email,
        token: user.token,
        password: newPassword,
        currentPassword: currentPassword,
      }
    );

    console.log("response.data", response.data);

    // Clear input fields
    setPasswords({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    // Close the modal
    setModalOpen(false);

    // Show success toast
    toast.success(response.data.message);
  } catch (error) {
    console.error("error", error);
    // Handle error
    // Show error toast or set error message
    setErrors({
      currentPassword: "Password is incorrect",
    });
    // toast.error(error.response.data.message);
  }
};
