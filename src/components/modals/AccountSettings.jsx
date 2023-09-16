import React, { useContext, useState } from "react";
import axios from "axios";
import UserContext from "../../context/UserContext";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

function AccountSettings({ setModalOpen }) {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setPasswords({ ...passwords, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };
  const [showCurrPassword, setShowCurrPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const toggleCurrPasswordVisibility = () => {
    setShowCurrPassword(!showCurrPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const changePassword = async (e) => {
    e.preventDefault();

    const { currentPassword, newPassword, confirmPassword } = passwords;

    // Validate input fields
    if (!currentPassword || !newPassword || !confirmPassword) {
      setErrors({
        currentPassword: currentPassword ? "" : "Current password is required",
        newPassword: newPassword ? "" : "New password is required",
        confirmPassword: confirmPassword ? "" : "Confirm password is required",
      });
      return;
    }

    // Password validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(newPassword)) {
      setErrors({
        newPassword:
          "Password must contain at least 6 characters, one uppercase letter, one lowercase letter, one digit, and one special character - @$!%*?&",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" });
      return;
    }

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
      // Handle error error
      // Show error toast
      setErrors({
        currentPassword: "Password is incorrect",
      });
      // toast.error(error.response.data.message);
    }
  };

  const logout = () => {
    // Clear user data from localStorage
    localStorage.clear();
    // Update user state to null
    setUser(null);
    // Navigate to signIn page
    navigate("/signIn");
  };

  return (
    <div className="account-setting-modal">
      <form id="container">
        <div className="close-btn" onClick={() => setModalOpen(false)}>
          <CloseIcon />
        </div>

        <div className="heading">
          <h3 id="Heading">
            Hey there,
            <br /> {user?.result.username} !
          </h3>
        </div>
        <div className="email-container">
          <h5>Current Email: </h5>
          <p>{user?.result.email}</p>
        </div>

        <div className="change-password-container">
          <h5>Change Password</h5>
          <div className="row">
            <div className="icon">
              <VpnKeyIcon />
            </div>
            <input
              type={showCurrPassword ? "text" : "password"}
              placeholder="Current Password"
              name="currentPassword"
              value={passwords.currentPassword}
              onChange={handleOnChange}
            />
            <div className="show-icon">
              {showCurrPassword ? (
                <VisibilityOffIcon onClick={toggleCurrPasswordVisibility} />
              ) : (
                <VisibilityIcon onClick={toggleCurrPasswordVisibility} />
              )}
            </div>
          </div>

          {errors.currentPassword && (
            <div className="error">{errors.currentPassword}</div>
          )}

          <div className="row">
            <div className="icon">
              <VpnKeyIcon />
            </div>
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="New Password"
              name="newPassword"
              value={passwords.newPassword}
              onChange={handleOnChange}
            />
            <div className="show-icon">
              {showConfirmPassword ? (
                <VisibilityOffIcon onClick={toggleConfirmPasswordVisibility} />
              ) : (
                <VisibilityIcon onClick={toggleConfirmPasswordVisibility} />
              )}
            </div>
          </div>

          {errors.newPassword && (
            <div className="error">{errors.newPassword}</div>
          )}

          <div className="row">
            <div className="icon">
              <VpnKeyIcon />
            </div>
            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="Confirm Password"
              name="confirmPassword"
              value={passwords.confirmPassword}
              onChange={handleOnChange}
            />
            <div className="show-icon">
              {showNewPassword ? (
                <VisibilityOffIcon onClick={toggleNewPasswordVisibility} />
              ) : (
                <VisibilityIcon onClick={toggleNewPasswordVisibility} />
              )}
            </div>
          </div>

          {errors.confirmPassword && (
            <div className="error">{errors.confirmPassword}</div>
          )}
        </div>

        <div className="modal-buttons">
          <button type="submit" onClick={changePassword}>
            Save
          </button>
          <button className="cancel" onClick={() => setModalOpen(false)}>
            Cancel
          </button>
          <button className="logout" onClick={logout}>
            Logout
          </button>
        </div>
      </form>
    </div>
  );
}

export default AccountSettings;
