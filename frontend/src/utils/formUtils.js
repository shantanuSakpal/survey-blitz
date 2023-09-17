// utils/formUtils.js
import axios from "axios";

export const storeFormInDb = async (user, formObject) => {
    try {
        const requestBody = {
            email: user.result.email,
            token: user.token, // Replace with your authentication token
            formObject: formObject,
        };

        // Add the form to the database
        const response = await axios.post('http://localhost:3001/admin/createForm', requestBody);
        console.log('Form stored successfully', response);
        return response;
    } catch (error) {
        if (error.response && error.response.status === 400) {
            throw new Error("Validation error");
        } else {
            console.error('Error:', error);
            throw new Error(error.response.data.message);
        }
    }
};

export const updateFormInDb = async (email, token, formObject) => {
    try {
        const requestBody = {
            email: email,
            token: token,
            formObject: formObject,
        };

        // Update the form in the database
        const response = await axios.post('http://localhost:3001/admin/updateForm', requestBody);
        console.log('Form updated successfully');
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw new Error(error.response.data.message);
    }
};




