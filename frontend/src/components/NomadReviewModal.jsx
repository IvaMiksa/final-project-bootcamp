import React, {useState} from 'react';
import styled from 'styled-components';
import {useSelector} from "react-redux";
import NomadStarRating from "./NomadStarRating.jsx";
import {AxiosInstance} from "../utils/axios.js";
import {toast} from "react-toastify";

const ModalBackdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContainer = styled.div`
    background-color: #fff;
    padding: 2rem;
    border-radius: 8px;
    width: 40%;
    max-width: 600px;
`;

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
`;

const TextArea = styled.textarea`
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-top: 10px;
    font-size: 14px;
    resize: vertical;
`;

const SubmitButton = styled.button`
    padding: 10px 20px;
    background-color: #0074b7;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 20px;

    &:hover {
        background-color: #0388d5;
    }
`;

const NomadReviewModal = ({propertyId, onClose, onReviewSubmit, existingReview}) => {
    const [rating, setRating] = useState(existingReview ? existingReview.rating : 0); //keep track of rating
    const [content, setContent] = useState(existingReview ? existingReview.content : '');
    const [reviewId, setReviewId] = useState(existingReview ? existingReview.id : null);

    const token = useSelector((state) => state.user.accessToken);


    const handleStarClick = (newRating) => {
        setRating(newRating);  // update rating when star clicked
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        if (!content || !rating) {
            toast.error('Please provide a rating and content for the review.');
            return;
        }

        const reviewData = {
            property: propertyId,
            content: content,
            rating: rating,
        };

        if (reviewId) {
            // Update existing review
            AxiosInstance.patch(`property/review/${reviewId}/`, reviewData, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": 'application/json',
                }
            })
                .then((response) => {
                    console.log('Review updated:', response.data);
                    //toast.success('Review updated successfully!');
                    onReviewSubmit(response.data); // pass updated review data back to parent
                    onClose();
                })
                .catch((error) => {
                    console.error('Error updating review:', error);
                    toast.error('Failed to update review. Please try again.');
                });
        } else {
            // Create new review
            AxiosInstance.post(`property/create-review/${propertyId}/`, reviewData, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": 'application/json',
                }
            })
                .then((response) => {
                    console.log('Review created:', response.data);
                    //toast.success('Review created successfully!');
                    onReviewSubmit(response.data); // pass new review data back to parent
                    onClose();
                })
                .catch((error) => {
                    console.error('Error creating review:', error);
                    //toast.error('Failed to create review. Please try again.');
                });
        }
    };


    return (
        <ModalBackdrop>
            <ModalContainer>
                <ModalHeader>
                    <h2>{!reviewId ? 'Leave a review' : 'Edit review'}</h2>
                    <CloseButton onClick={onClose}>&times;</CloseButton>
                </ModalHeader>

                <NomadStarRating rating={rating} onClick={handleStarClick}/>

                <TextArea
                    placeholder="Write your review here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows="5"
                />
                <SubmitButton onClick={handleSubmit}>Submit Review</SubmitButton>
            </ModalContainer>
        </ModalBackdrop>
    );
};

export default NomadReviewModal;
