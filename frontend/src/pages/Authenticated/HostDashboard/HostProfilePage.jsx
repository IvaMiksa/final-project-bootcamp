import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import {setUserData} from "../../../store/slices/userSlice.js";
import {FaEdit} from "react-icons/fa";
import {MdCloudUpload} from "react-icons/md";
import {AiOutlineCheckCircle} from "react-icons/ai";
import {AxiosInstance} from "../../../utils/axios.js";
import {setBookings, setProperties} from "../../../store/slices/generalSlice.js";
import HostDashboardLayout from "../../Layouts/HostDashboardLayout/HostDashboardLayout.jsx";
import {toast} from "react-toastify";


const Container = styled.div`
    display: flex;
    justify-content: center;
    padding: 20px;
`;

const EditProfileForm = styled.div`
    width: 600px;
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const AvatarContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-direction: column;
    align-items: center;
    position: relative;
    padding: 10px;
`;

const Avatar = styled.img`
    width: 90px;
    height: 90px;
    border-radius: 50%;
    object-fit: cover;
`;

const FormContainer = styled.div``;

const FormRow = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 15px;
`;

const InputField = styled.input`
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    background: #f5f5f5;
    color: #333;

    &:read-only {
        background: #f0f0f0;
        color: #888;
    }

    &:focus {
        border-color: #007bff;
        outline: none;
        background: #ffffff;
    }
`;

const SaveButton = styled.button`
    width: 100%;
    padding: 10px;
    background-color: #115191;
    color: white;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #186ec5;
    }
`;

const UserInfo = styled.div`
    display: flex;
    flex-direction: row;
    gap: 15px;
    margin-bottom: 20px;
    padding: 10px;
`;


const UserDetails = styled.div`
    flex-grow: 1;
    margin-top: 10px;
    padding: 10px;

`;

const UserName = styled.h2`
    font-size: 18px;
    font-weight: bold;
    margin: 0;
`;

const UserTitle = styled.p`
    color: #777;
    font-size: 14px;
    margin: 5px 0;
`;

const BadgeContainer = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 5px;
`;

const Badge = styled.span`
    background: ${(props) => (props.color === "blue" ? "#e0f7ff" : "#f3e5ff")};
    color: ${(props) => (props.color === "blue" ? "#007bff" : "#7d4ca0")};
    padding: 5px 10px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
`;

const ToggleButton = styled.button`
    background: #115191;
    color: #fff;
    border: none;
    padding: 10px;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    margin-bottom: 20px;
    width: 100%;

    &:hover {
        background: #186ec5;
    }
`;


const UploadIcon = styled(MdCloudUpload)`
    position: absolute;
    bottom: 5px;
    right: 5px;
    font-size: 24px;
    color: #fff;
    cursor: pointer;
    background-color: rgba(205, 203, 203, 0.5);
    padding: 5px;
    border-radius: 50%;

    &:hover {
        background-color: rgba(108, 107, 107, 0.7);
    }
`;


const DocumentSectionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 30px;
`;

const DocumentWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 13px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #f1f1f1;
    }
    
    &:last-child {
        margin-bottom: 20px; 
    }
    
`;

const DocumentName = styled.span`
    font-size: 14px;
    font-weight: 500;
    color: #333;
    
`;

const VerifiedBadge = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
    font-weight: 500;
    color: #28a745; 
`;


const PreviewContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #f1f1f1;
    border-radius: 8px;
    margin-top: 10px;
`;

const FilePreview = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
`;

const FileName = styled.span`
    font-size: 14px;
    color: #555;
`;

const RemoveButton = styled.button`
    padding: 4px 8px;
    background-color: #dc3545;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 12px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #c82333;
    }
`;

const HostProfilePage = () => {
    const jobContractRef = useRef();
    const visaPermitRef = useRef();
    const passportIdRef = useRef();
    const incomeProofRef = useRef();
    const profileImageRef = useRef();

    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user.userData);
    const [isEditing, setIsEditing] = useState(false);
    const [isAvatarChanged, setIsAvatarChanged] = useState(false);
    const [isVerifiedDocsVisible, setIsVerifiedDocsVisible] = useState(false);
    const properties = useSelector((state) => state.general.properties);
    const [avatarPreview, setAvatarPreview] = useState(null);


    useEffect(() => {
        const fetchBookings = async () => {
            const token = localStorage.getItem("accessToken");
            try {
                const response = await AxiosInstance.get("property/me/", {
                    headers: {Authorization: `Bearer ${token}`},
                });
                dispatch(setProperties(response.data));
            } catch (error) {
                console.error("Error fetching bookings:", error);
            }
        };
        fetchBookings();
    }, [dispatch]);

    const [uploadedFiles, setUploadedFiles] = useState({
        uploadContract: null,
        uploadVisa: null,
        uploadPassport: null,
        uploadIncome: null,
    });

    useEffect(() => {
        if (userData) {
            Object.keys(userData).forEach((field) => {
                dispatch(setUserData({field, value: userData[field]}));
            });
        }
    }, [dispatch, userData]);


    const handleChange = (e) => {
        const {name, value, type, files} = e.target;

        if (type === 'file') {
            if (name === 'avatar') {
                if (files.length > 0) {
                    dispatch(setUserData({field: name, value: files[0]}));
                    setIsAvatarChanged(true);
                } else {
                    dispatch(setUserData({field: name, value: null}));
                    setIsAvatarChanged(false);
                }
            } else {
                // Handle other file inputs
                if (files.length > 0) {
                    setUploadedFiles((prev) => ({
                        ...prev,
                        [name]: files[0],
                    }));
                } else {
                    setUploadedFiles((prev) => ({
                        ...prev,
                        [name]: null,
                    }));
                }
            }
        } else {
            dispatch(setUserData({field: name, value}));
        }
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                // Set avatar preview from FileReader result (base64 image string)
                setAvatarPreview(reader.result);
                setIsAvatarChanged(true);
                // Store only the file name or URL in Redux (avoid storing the entire File object)
                dispatch(setUserData({field: "avatar", value: file.name}));
            };
            reader.readAsDataURL(file);
        }
    };


    const handleRemove = (fileKey) => {
        setUploadedFiles((prev) => ({
            ...prev,
            [fileKey]: null,
        }));
    };

    const toggleEditMode = () => {
        console.log("Editing mode before toggle:", isEditing);
        if (isEditing) {
            handleSave();
        } else {
            setIsEditing(true);
            console.log("Editing mode set to true");
        }
        console.log("Editing mode after toggle:", isEditing);
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem("accessToken");
            const formData = new FormData();

            if (isAvatarChanged && avatarPreview) {
                const file = profileImageRef.current.files[0];
                formData.append("avatar", file);
            }

            Object.keys(userData).forEach(field => {
                if (field !== 'avatar') { // exclude the avatar to avoid duplicate entries
                    formData.append(field, userData[field]);
                }
            });

            const response = await AxiosInstance.patch("users/me/", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status !== 200) {
                throw new Error("Failed to save changes.");
            }

            const updatedUserData = response.data;
            Object.keys(updatedUserData).forEach((field) => {
                dispatch(setUserData({field, value: updatedUserData[field]}));
            });

            toast.success("Profile updated successfully!")
            setIsEditing(false);
            setIsAvatarChanged(false); // reset avatar state after saving
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("An error occurred while saving changes.")
        }
    };


    const toggleVerifiedDocs = () => {
        setIsVerifiedDocsVisible((prev) => !prev);
    };


    return (
        <HostDashboardLayout>
            <Container>
                <EditProfileForm>
                    <UserInfo>
                        <AvatarContainer>
                            <Avatar
                                src={avatarPreview || (userData.avatar ? `https://nomadly.propulsion-learn.ch${userData.avatar}` : '/nomad_photos/user.png')}
                                alt="User Avatar"
                            />
                            {isEditing && (<UploadIcon
                                onClick={(e) => {
                                    e.preventDefault();
                                    profileImageRef.current.click();
                                }}
                            />)}
                            <input
                                type="file"
                                name="avatar"
                                ref={profileImageRef}
                                hidden
                                onChange={handleAvatarChange}
                            />
                        </AvatarContainer>
                        <UserDetails>
                            <UserName>{userData.first_name} {userData.last_name}</UserName>
                            <UserTitle>Property Owner</UserTitle>
                            <BadgeContainer>
                                <Badge color="blue">{userData.verification_status === 'accepted' ? "Verified Member" : "Member not verified"}</Badge>
                                <Badge color="purple">{properties.length} Properties</Badge>
                            </BadgeContainer>
                        </UserDetails>
                    </UserInfo>

                    <FormContainer>
                        <FormRow>
                            <InputField
                                type="text"
                                placeholder="First Name"
                                name="first_name"
                                value={userData.first_name}
                                onChange={handleChange}
                                readOnly={!isEditing}
                            />
                            <InputField
                                type="text"
                                placeholder="Last Name"
                                name="last_name"
                                value={userData.last_name}
                                onChange={handleChange}
                                readOnly={!isEditing}
                            />
                        </FormRow>

                        <FormRow>
                            <InputField
                                type="email"
                                placeholder="Email"
                                name="email"
                                value={userData.email}
                                onChange={handleChange}
                                readOnly={!isEditing}
                            />
                        </FormRow>

                        <FormRow>
                            <InputField
                                type="date"
                                placeholder="Date of birth"
                                name="date_of_birth"
                                value={userData.date_of_birth}
                                onChange={handleChange}
                                readOnly={!isEditing}
                            />
                            <InputField
                                type="text"
                                placeholder="Phone"
                                name="phone_number"
                                value={userData.phone_number}
                                onChange={handleChange}
                                readOnly={!isEditing}
                            />
                        </FormRow>

                        <FormRow>
                            <InputField
                                type="text"
                                placeholder="City"
                                name="city"
                                value={userData.city}
                                onChange={handleChange}
                                readOnly={!isEditing}
                            />
                            <InputField
                                type="text"
                                placeholder="Country"
                                name="country"
                                value={userData.country}
                                onChange={handleChange}
                                readOnly={!isEditing}
                            />
                        </FormRow>



                        <ToggleButton onClick={toggleVerifiedDocs}>
                            {isVerifiedDocsVisible ? 'Hide Verified Documents' : 'Show Verified Documents'}
                        </ToggleButton>

                        {isVerifiedDocsVisible && (
                            <FormContainer>
                                <DocumentSectionWrapper>

                                    <DocumentWrapper>
                                        <DocumentName>passport.pdf</DocumentName>
                                        <VerifiedBadge>
                                            Verified
                                        </VerifiedBadge>
                                        {/*<ButtonUpload onClick={(e) => {
                                    e.preventDefault();
                                    if (isEditing) passportIdRef.current.click();
                                }} disabled={!isEditing}>
                                    Edit
                                </ButtonUpload>*/}
                                        <input type="file" name="uploadPassport" ref={passportIdRef} hidden
                                               onChange={handleChange}/>
                                    </DocumentWrapper>
                                    {uploadedFiles.uploadPassport && (
                                        <PreviewContainer>
                                            <FilePreview>
                                                <FileName>{uploadedFiles.uploadPassport.name}</FileName>
                                                <RemoveButton onClick={() => handleRemove('uploadPassport')}>
                                                    Remove
                                                </RemoveButton>
                                            </FilePreview>
                                        </PreviewContainer>
                                    )}

                                    <DocumentWrapper>
                                        <DocumentName>proof_of_ownership.pdf</DocumentName>
                                        <VerifiedBadge>
                                            Verified
                                        </VerifiedBadge>
                                        {/*<ButtonUpload onClick={(e) => {
                                    e.preventDefault();
                                    if (isEditing) incomeProofRef.current.click();
                                }} disabled={!isEditing}>
                                    Edit
                                </ButtonUpload>*/}
                                        <input type="file" name="uploadIncome" ref={incomeProofRef} hidden
                                               onChange={handleChange}/>
                                    </DocumentWrapper>
                                    {uploadedFiles.uploadIncome && (
                                        <PreviewContainer>
                                            <FilePreview>
                                                <FileName>{uploadedFiles.uploadIncome.name}</FileName>
                                                <RemoveButton onClick={() => handleRemove('uploadIncome')}>
                                                    Remove
                                                </RemoveButton>
                                            </FilePreview>
                                        </PreviewContainer>
                                    )}
                                </DocumentSectionWrapper>

                            </FormContainer>
                        )}


                        <SaveButton type="button" onClick={toggleEditMode}>
                            {isEditing ? 'Save changes' : 'Edit profile'}
                        </SaveButton>
                    </FormContainer>
                </EditProfileForm>
            </Container>
        </HostDashboardLayout>
    );
};

export default HostProfilePage;
