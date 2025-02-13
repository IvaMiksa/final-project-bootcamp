import  {  useEffect } from 'react';
import NomadDashboardAnalyticsLayout from "../../Layouts/NomadDashboardAnalyticsLayout/NomadDashboardAnalyticsLayout.jsx";
import PropertyCard from "../../../components/Cards/PropertyCard.jsx";
import { AxiosInstance } from '../../../utils/axios.js';
import {useDispatch, useSelector} from "react-redux";
import {setUserFavouriteProperties} from "../../../store/slices/userSlice.js";
import {StyledLink} from "../../Public/SearchResultsPage/SearchResultsPageStyle.js";


const NomadFavouritesPage = () => {
    const dispatch = useDispatch()
    const accessToken = useSelector(store => store.user.accessToken)
    const favouriteProperties = useSelector(store => store.user.userFavouriteProperties)
    useEffect(() => {
        if (!accessToken) {
            return
        }
        AxiosInstance(`property/favourites/`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(res => {
                dispatch(setUserFavouriteProperties({favourite_properties: res.data}))
            })
            .catch(err => {
                console.log(err)
            })
    }, [accessToken])


    return (
        <NomadDashboardAnalyticsLayout>
            {favouriteProperties.map(property => (
                <StyledLink to={`/property/${property.id}/`} key={property.id}>
                    <PropertyCard
                        id={property.id}
                        user_favourite={property.user_favourite}
                        image={property.images[0]?.content}
                        title={property.name}
                        description={property.description}
                        price={property.price}
                        rating={property.averageRating}
                        location={`${property.city}, ${property.country}`}
                        type={property.propertyType}
                        size={property.size}
                />

                </StyledLink>

            ))}
        </NomadDashboardAnalyticsLayout>
    );
};

export default NomadFavouritesPage;