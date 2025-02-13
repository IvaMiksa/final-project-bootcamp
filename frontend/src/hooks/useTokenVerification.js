import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {login_user, logout_user, setUserData} from "../store/slices/userSlice.js";
import {useNavigate} from "react-router-dom";
import {AxiosInstance} from "../utils/axios.js";

const useTokenVerification = () => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.user.accessToken);
    const navigate = useNavigate();

    useEffect(() => {
        const verifyToken = async () => {
            // Token persistence after page refreshes
            const storedToken = token || localStorage.getItem("accessToken");
            if (!storedToken) {
                dispatch(logout_user());
                return;
            }

            try {
                // Verify token with backend
                await AxiosInstance.post("auth/token/verify/", {
                    token: storedToken,
                });

                // Dispatch login action if token is valid
                dispatch(login_user(storedToken));

                const userResponse = await AxiosInstance.get("users/me/", {
                    headers: {Authorization: `Bearer ${storedToken}`},
                });

                const userData = userResponse.data;
                //console.log("User data:", userData);

                if (userData) {
                    const mappedData = {
                        user_type: userData.user_type || "",
                        first_name: userData.first_name || "",
                        last_name: userData.last_name || "",
                        email: userData.email || "",
                        username: userData.username || "",
                        country: userData.country || "",
                        nationality: userData.nationality || "",
                        date_of_birth: userData.date_of_birth || "",
                        gender: userData.gender || "",
                        streetName: userData.streetName || "",
                        houseNumber: userData.houseNumber || "",
                        city: userData.city || "",
                        postcode: userData.postcode || "",
                        employmentType: userData.employmentType || "",
                        jobTitle: userData.jobTitle || "",
                        linkedinProfile: userData.linkedinProfile || "",
                        uploadContract: userData.uploadContract || null,
                        uploadVisa: userData.uploadVisa || null,
                        uploadPassport: userData.uploadPassport || null,
                        uploadIncome: userData.uploadIncome || null,
                        avatar: userData.avatar || null,
                        verification_status: userData.verification_status || "",
                    };

                    Object.keys(mappedData).forEach((field) => {
                        dispatch(setUserData({field, value: mappedData[field]}));
                    });

                }

            } catch (error) {
                console.error("Token verification error:", error);
                dispatch(logout_user());
            }
        };

        verifyToken();
    }, [token, dispatch, navigate]);
};

export default useTokenVerification;
