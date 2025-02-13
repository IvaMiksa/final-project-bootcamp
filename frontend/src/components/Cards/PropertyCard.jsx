import  { useState } from 'react';
import StarRating from "../StarRating/StarRating.jsx";
import Text from "../Text/Text.jsx";
import styled from 'styled-components';
import Button from "../Button/Button.jsx";
import Price from "./Price.jsx";
import {AxiosInstance} from "../../utils/axios.js";
import {useDispatch, useSelector} from "react-redux";
import {toggleFavouriteProperty} from "../../store/slices/userSlice.js";

const StyledCard = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
    max-width: ${p => p.theme.spaces.biggest};
    border: ${p => p.theme.border.light};
    border-radius: ${p => p.theme.borderRadius.xl2};
    box-shadow: ${p => p.theme.boxShadow.dark};
    margin: ${p => p.theme.spaces.xl2};
    transition: transform ${p => p.theme.transition.normal};
    position: relative;

    &:hover,
    &:focus {
        transform: scale3d(1.006, 1.006, 1);

        &::after {
            opacity: 1;
        }
    }
`;

const Image = styled.img`
    width: 100%;
    object-fit: cover;
    height: ${p => p.theme.spaces.big};
    aspect-ratio: ${p => p.theme.aspectRatio.rect};
`;

const HeartButton = styled.button`
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: rgba(255, 255, 255, 0.8);
    border: none;
    border-radius: 50%;
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background: rgba(255, 255, 255, 1);
    }

    svg {
        width: 1.5rem;
        height: 1.5rem;
        fill: ${props => props.$isFavorite ? 'red' : 'none'};
        stroke: ${props => props.$isFavorite ? 'red' : 'black'};
        stroke-width: 2;
    }
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: ${p => p.theme.spaces.xl4};
    height: ${p => p.theme.spaces.big};
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 1em;
    padding-top: 1em;
    padding-bottom: 1em;
    justify-content: space-between;
    align-items: center;
`;

const PropertyCard = ({image, price, description, rating, city, country, id, name, user_favourite}) => {
    const dispatch = useDispatch()
    const accessToken = useSelector(store => store.user.accessToken)
    const [isFavourite, setIsFavourite] = useState((user_favourite))
    const generateThumbnailImg = (baseUrl, width = 800, height = 600) => {
        return `${baseUrl}?w=${width}&h=${height}&fit=crop`;
    };

    const handleFavoriteClick = (e) => {
        e.preventDefault();
        setIsFavourite(!isFavourite)
        AxiosInstance.post(`property/add-favourite/${id}/`, undefined, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(res => {
                dispatch(toggleFavouriteProperty({propertyId: id}))
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    };

    // Extract the first sentence from the description
    const firstSentence = description.split('. ')[0] + '.';

    return (
        <StyledCard city={city} country={country}>
            <Image src={generateThumbnailImg(image)} alt={name}/>
            <HeartButton onClick={handleFavoriteClick} $isFavorite={isFavourite}>
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
            </HeartButton>
            <Content>
                <Text type="CardTitle" label={name}/>
                <Text type="description" label={firstSentence}/>
                <StarRating rating={rating}/>
                <ButtonGroup>
                    <Button type="details"/>
                    <Price amount={price} currency={"CHF"} label={" / day"}/>
                </ButtonGroup>
            </Content>
        </StyledCard>
    );
};

export default PropertyCard;