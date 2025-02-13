import HostDashboardLayout from "../../Layouts/HostDashboardLayout/HostDashboardLayout.jsx";
import InputField from "../../../components/Input/Input.jsx";
//import DragNDrop from "../../../components/DragNDrop.jsx";
import Button from "../../../components/Button/Button.jsx";
import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {clearPropertyForm, setAmenities, setPropertyForm} from "../../../store/slices/generalSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {AxiosInstance} from "../../../utils/axios.js";
import {toast} from "react-toastify";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUpload} from "@fortawesome/free-solid-svg-icons";


const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 20px;
    min-height: 60vh;
    margin: 20px;
    margin-top: 60px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 10px;
    width: 100%;
    max-width: 800px;
    margin-top: 30px;

`;


const FormColumns = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 20px;
`;

const FormLeft = styled.div`
    flex: 1;
    padding: 10px;
`;

const FormRight = styled.div`
    flex: 1;
    padding: 10px;
`;


const AmenitiesContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 800px;
    margin-top: 30px;
`;

const AmenitiesGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    width: 100%;
    max-width: 800px;
    margin-top: 20px;
`;

const AmenitiesForm = styled(Form)`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const AmenityItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(173, 216, 230, 0.7);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    margin: 5px 0;
    padding: 10px;
    border-radius: 5px;
    background-color: ${({isSelected}) => (isSelected ? 'rgba(173, 216, 230, 0.7)' : 'transparent')};
    width: 248px;
    height: 163px;

    &:hover {
        background-color: ${({isSelected}) => (isSelected ? 'rgba(173, 216, 230, 0.7)' : 'rgba(173, 216, 230, 0.3)')};
    }

    span {
        background-color: ${({isSelected}) => (isSelected ? 'rgba(173, 216, 230, 0.3)' : 'transparent')};

        &:focus {
            outline: none;
            background-color: ${({isSelected}) => (isSelected ? 'rgba(173, 216, 230, 0.7)' : 'rgba(173, 216, 230, 0.7)')};
        }

    }
`;

const AmenityIcon = styled.img`
    width: 24px;
    height: 24px;
    margin-right: 10px;
    background-color: transparent;
    transition: background-color 0.3s;

    &:hover {
        background-color: transparent;
    }

    &:focus,
    &:active {
        background-color: transparent;
        outline: none;
    }
`;


const UploadContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 400px;
    height: 400px;
    border: 2px dashed #0388d5;
    border-radius: 8px;
    padding: 15px;
    cursor: pointer;
    margin-bottom: 20px;
    transition: background-color 0.3s;

    &:hover {
        background-color: rgba(0, 123, 255, 0.1);
    }
`;

const UploadButton = styled.div`
    color: #007bff;
    font-weight: bold;
    font-size: 16px;
    text-align: center;
    padding: 10px;
    background-color: transparent;
    cursor: pointer;

    /*
    &:hover {
        background-color: rgba(0, 123, 255, 0.1); 
    }

    &:active {
        background-color: rgba(0, 123, 255, 0.1);*/

`;

const ImagePreviewContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    width: 100%;
    margin-top: 10px;
    position: relative;
`;

const ImagePreview = styled.div`
    position: relative;
    width: 100px;
    height: 100px;
    border-radius: 4px;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 4px;
    }
`;

const RemoveButton = styled.div`
    position: absolute;
    top: 5px;
    right: 5px;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 12px;
    cursor: pointer;
`;

const UploadIconContainer = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #007bff;
  font-size: 40px;
  cursor: pointer;
  padding: 10px;
  transition: color 0.3s;
  
  &:hover {
    color: rgba(0, 123, 255, 0.7);
  }
`;


const StepIndicatorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  color: ${({isActive}) => (isActive ? "#007bff" : "#999")};
  font-weight: ${({isActive}) => (isActive ? "bold" : "normal")};
`;

const StepCircle = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({isActive}) => (isActive ? "#333232" : "#e0e0e0")};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const SlideLabel = styled.div`
    font-size: 20px;
    margin-top: 8px;
    color: #333232;
    font-weight: bold;
`;

const FormContainer = styled.div`
    background-color: #ffffff;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    max-width: 800px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    margin-bottom: 20px;
`;
const HostEditPropertyPage = () => {
    const {propertyId} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const propertyFormData = useSelector((state) => state.general.propertyFormData);
    const amenities = useSelector((state) => state.general.amenities);
    const [selectedAmenities, setSelectedAmenities] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(1);
    const fileInputRef = useRef(null);
    const [selectedImages, setSelectedImages] = useState([]);
    const token = useSelector((state) => state.user.accessToken);

    const fetchPropertyById = async (id) => {
        try {
            const response = await AxiosInstance.get(`/property/${id}/`);
            if (response.status === 200) {
                const data = response.data;
                console.log("Fetched data:", data);
                return data;
            } else {
                console.error("Failed to fetch property data");
                return null;
            }
        } catch (error) {
            console.error("Error fetching property data:", error);
            return null;
        }
    };


    useEffect(() => {
        const loadProperty = async () => {
            const data = await fetchPropertyById(propertyId);
            if (data) {
                dispatch(setPropertyForm(data));
            }
        };

        dispatch(clearPropertyForm());
        if (propertyId) {
            loadProperty();
        }
    }, [propertyId, dispatch]);


    // set the selected amenities whenever the property data changes
    useEffect(() => {
        if (propertyFormData.amenities_ids) {
            setSelectedAmenities(propertyFormData.amenities_ids);
        }
    }, [propertyFormData]);


    useEffect(() => {
        console.log("Property Form Data:", propertyFormData);
    }, [propertyFormData]);

    // Fetch amenities on component mount
    useEffect(() => {
        (async () => {
            try {
                const response = await AxiosInstance.get("property/amenities", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                const data = response.data;
                console.log('Amenities:', data);
                dispatch(setAmenities(data));
            } catch (error) {
                console.error("Error fetching amenities:", error);
            }
        })();
    }, [dispatch, token]);


    // Handle selected amenities
    const handleSelectAmenity = (amenityId) => {
        setSelectedAmenities((prevAmenities) => {
            const isSelected = prevAmenities.includes(amenityId);
            const updatedAmenities = isSelected
                ? prevAmenities.filter(id => id !== amenityId)
                : [...prevAmenities, amenityId];

            console.log("Updated Amenities IDs:", updatedAmenities);
            //dispatch(setPropertyForm({ field: "amenities_ids", value: updatedAmenities })); moved to useEffect to avoid re-rendering issue

            return updatedAmenities;
        });
    };

    // Use useEffect to dispatch whenever selectedAmenities changes
    useEffect(() => {
        dispatch(setPropertyForm({field: "amenities_ids", value: selectedAmenities}));
    }, [selectedAmenities, dispatch]);


    // Handle input change
    const handleChange = (e) => {
        const {name, value, type, files} = e.target;

        console.log("Triggered handleChange for Field Name:", name);

        // Log all the fields
        console.log("Event Target:", e.target);
        console.log("Field Name:", name);
        console.log("Field Value:", value);
        console.log("Field Type:", type);
        console.log("Files:", files);

        // Check if field amenities_ids & convert it into an array
        if (name === 'amenities_ids') {
            const amenitiesArray = value.split(',').map(item => item.trim());
            console.log("Parsed Amenities IDs:", amenitiesArray);
            dispatch(setPropertyForm({field: name, value: amenitiesArray}));

        } else {
            const finalValue = type === 'file' ? files[0] : value;
            console.log("Final Value to Dispatch:", finalValue);
            dispatch(setPropertyForm({field: name, value: finalValue}));
        }
    };

    // Handle redirection to slides
    const goToSlide = (slideNumber) => {
        setCurrentSlide(slideNumber);
    };


    const handleContinue = () => {
        setCurrentSlide(2);
    };

    const handleNext = () => {
        setCurrentSlide(3);
    };


    // Handle image change
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedImages((prevImages) => [...prevImages, ...files]);
    };

    const handleRemoveImage = (index) => {
        setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));

        // Reset to allow re-importing of the same file
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(propertyFormData).forEach(key => {
            formData.append(key, propertyFormData[key] || ""); // default empty string if undefined
        });
        selectedImages.forEach(image => formData.append("upload_images", image));

        try {
            const response = await AxiosInstance.patch(`/property/${propertyId}/`, formData, {
                headers: {"Content-Type": "multipart/form-data"}
            });
            if (response.status === 200) {
                toast.success("Property updated successfully.");
                setSelectedImages([]); // Clear images on success
                navigate('/host-properties');
            } else {
                toast.error("Failed to update the property. Please try again.");
            }
        } catch (error) {
            console.error("Error updating property:", error);
            toast.error("An error occurred while updating the property.");
        }
    };


    return (
        <HostDashboardLayout>
            <Container>
                {currentSlide === 1 && (
                    <>
                        <SlideLabel>Update property</SlideLabel>
                        <Form onSubmit={(e) => e.preventDefault()}>

                            <FormColumns>
                                <FormLeft>
                                    <div>
                                        <InputField
                                            type="text"
                                            placeholder="Property name"
                                            name="name"
                                            value={propertyFormData.name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <InputField
                                            type="text"
                                            placeholder="Property size"
                                            name="size"
                                            value={propertyFormData.size}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <InputField
                                            type="number"
                                            placeholder="Price"
                                            name="price"
                                            value={propertyFormData.price}
                                            onChange={handleChange}

                                        />
                                    </div>
                                    <div>
                                        <InputField
                                            placeholder="Description"
                                            type="text"
                                            name="description"
                                            value={propertyFormData.description}
                                            onChange={handleChange}

                                        />
                                    </div>

                                </FormLeft>


                                <FormRight>
                                    <div>
                                        <InputField
                                            placeholder="Street"
                                            type="text"
                                            name="street"
                                            value={propertyFormData.street}
                                            onChange={handleChange}

                                        />
                                    </div>
                                    {/*<div>
                                        <InputField
                                            placeholder="Floor number"
                                            type="text"
                                            name="floor_number"
                                            value={propertyFormData.floor_number}
                                            onChange={handleChange}
                                            maxLength="3"

                                        />
                                    </div>*/}
                                    <div>
                                        <InputField
                                            placeholder="City"
                                            type="text"
                                            name="city"
                                            value={propertyFormData.city}
                                            onChange={handleChange}

                                        />
                                    </div>
                                    <div>
                                        <InputField
                                            placeholder="Postcode"
                                            type="text"
                                            name="post_code"
                                            value={propertyFormData.post_code}
                                            onChange={handleChange}
                                            maxLength="10"

                                        />
                                    </div>
                                    <div>
                                        <InputField
                                            placeholder="Country"
                                            type="text"
                                            name="country"
                                            value={propertyFormData.country}
                                            onChange={handleChange}

                                        />
                                    </div>

                                </FormRight>
                            </FormColumns>
                            <Button label="Continue" onClick={handleContinue}></Button>
                        </Form>  </>
                )}


                {currentSlide === 2 && (
                    <AmenitiesContainer>
                        <AmenitiesForm>
                            <SlideLabel>Select Amenities</SlideLabel>
                            <AmenitiesGrid>
                                {amenities.map(amenity => (
                                    <AmenityItem key={amenity.id} isSelected={selectedAmenities.includes(amenity.id)}
                                                 onClick={() => handleSelectAmenity(amenity.id)} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                        margin: '5px 0'
                                    }}>
                                        <AmenityIcon
                                            src={`${amenity.icon}`} /*"http://localhost:8000/media-files/amenity/icons/parking_icon_4OlMF6B.svg"*/
                                            alt={amenity.name}
                                            style={{width: '24px', height: '24px', marginRight: '10px'}}
                                        />
                                        <span>{amenity.name}</span>
                                    </AmenityItem>
                                ))}
                            </AmenitiesGrid>
                            <Button type="button" label="Continue" onClick={handleNext}></Button>
                        </AmenitiesForm>
                    </AmenitiesContainer>
                )}


                {currentSlide === 3 && (
                    <Form onSubmit={handleSubmit}>
                        <UploadContainer>

                            {/*<label htmlFor="upload-images">
                                <UploadButton>Upload Photos</UploadButton>
                                <input
                                    id="upload-images"
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    style={{display: "none"}}
                                />
                            </label>*/}

                            <UploadIconContainer htmlFor="upload-images">
                                <FontAwesomeIcon icon={faUpload}/> {/* Upload Icon */}
                                <SlideLabel>Upload photos</SlideLabel>
                                <input
                                    id="upload-images"
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    ref={fileInputRef}
                                    style={{display: "none"}}
                                />
                            </UploadIconContainer>

                            <ImagePreviewContainer>
                                {selectedImages.map((image, index) => (
                                    <ImagePreview key={index}>
                                        <img
                                            src={URL.createObjectURL(image)}
                                            alt={`Preview ${index + 1}`}
                                        />
                                        <RemoveButton onClick={() => handleRemoveImage(index)}>×</RemoveButton>
                                    </ImagePreview>
                                ))}
                            </ImagePreviewContainer>
                        </UploadContainer>

                        <Button type="submit" label="Submit"></Button>
                    </Form>)}

                <StepIndicatorContainer>
                    <Step isActive={currentSlide === 1} onClick={() => goToSlide(1)}>
                        <StepCircle isActive={currentSlide === 1}></StepCircle>
                    </Step>
                    <Step isActive={currentSlide === 2} onClick={() => goToSlide(2)}>
                        <StepCircle isActive={currentSlide === 2}></StepCircle>
                    </Step>
                    <Step isActive={currentSlide === 3} onClick={() => goToSlide(3)}>
                        <StepCircle isActive={currentSlide === 3}></StepCircle>
                    </Step>
                </StepIndicatorContainer>

            </Container>
        </HostDashboardLayout>
    );
};

export default HostEditPropertyPage;
