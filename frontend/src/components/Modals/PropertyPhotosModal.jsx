import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper/modules";

import {CloseButton, StyledBackdrop, StyledImage, StyledModal} from "./PropertyPhotosModalStyle.js";


const PropertyPhotosModal = ({images, selectedIndex, setSelectedIndex}) => {
    const closeModal = () => {
        setSelectedIndex(null)
    }
    return (
        <>
            <StyledBackdrop>
                {selectedIndex !== null && (
                    <StyledModal>
                        <Swiper
                            modules={[Navigation]}
                            initialSlide={selectedIndex}
                            spaceBetween={0}
                            slidesPerView={1}
                            loop={false}
                            navigation
                            speed={500}
                        >
                            {images?.map((image, idx) => (
                                <SwiperSlide key={image.id} style={{width: "100%", height: "500px"}}>
                                    <StyledImage
                                        alt={`Image ${idx + 1}`}
                                        src={image.content}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <CloseButton onClick={closeModal}>X</CloseButton>
                    </StyledModal>
                )}
            </StyledBackdrop>

        </>
    )
}

export default PropertyPhotosModal