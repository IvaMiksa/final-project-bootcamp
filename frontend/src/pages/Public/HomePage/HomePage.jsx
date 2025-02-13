import React, {useState, useEffect} from 'react';
import {
    Container,
    PhotoContainer,
    DayPickerContainer,
    IconContainer,
    SwiperContainer,
    StyledInfoSection,
    StyledContent,
    TeamSection,
    TeamContainer,
    CallToActionContainer, ContentContainer, StyledTextContent, StyledVideoSection
} from './HomeStyle';
import Button from '../../../components/Button/Button.jsx';
import 'react-day-picker/dist/style.css';
import {format} from 'date-fns';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/swiper-bundle.css';
import {Navigation, Autoplay, EffectFade} from 'swiper/modules';
import {LiaFileContractSolid} from "react-icons/lia";
import {RiVerifiedBadgeLine} from "react-icons/ri";
import {IoCalendarOutline} from "react-icons/io5";
import {GrGroup} from "react-icons/gr";
import {FaComputer} from "react-icons/fa6";
import {CiDiscount1} from "react-icons/ci";
import IconBox from "../../../components/Icons/IconBox.jsx";
import Text from "../../../components/Text/Text.jsx";
import CityCountryMultiSelect from "../../../components/Input/CityCountryMultiSelect.jsx";
import {useNavigate} from "react-router-dom";
import TeamCard from "../../../components/Cards/TeamCard.jsx";
import members from "../../../utils/teamData.js";
import CustomDayPicker from "../../../components/DatePicker/DatePickerStyle.js";


const HomePage = () => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [selectedRange, setSelectedRange] = useState({from: null, to: null});

    const today = new Date();
    const disablePastDates = (date) => date < today.setHours(0, 0, 0, 0);

    const navigate = useNavigate();

    const handleSearchClick = () => {
        const searchParams = new URLSearchParams();
        const formatDate = (date) => format(date, 'dd-MM-yyyy');

        if (selectedOptions.length > 0) searchParams.append('locations', JSON.stringify(selectedOptions));
        if (selectedRange.from) searchParams.append('from', formatDate(selectedRange.from));
        if (selectedRange.to) searchParams.append('to', formatDate(selectedRange.to));

        navigate(`/search-results?${searchParams.toString()}`);
    };

    const iconData = [
        {icon: LiaFileContractSolid, title: 'AUTOMATED', description: 'Rental agreements'},
        {icon: RiVerifiedBadgeLine, title: 'VERIFIED', description: 'Verified stays only'},
        {icon: IoCalendarOutline, title: 'FLEXIBLE', description: 'Flexible Booking'},
        {icon: GrGroup, title: 'COMMUNITY', description: 'Community Events'},
        {icon: FaComputer, title: 'EQUIPMENT', description: 'Equipment Rental'},
        {icon: CiDiscount1, title: 'MEMBER', description: 'Discounts'}
    ];

    return (
        <div>
            <Container>
                <ContentContainer>
                    <StyledContent>
                        <CallToActionContainer>
                            <Text type="CardTitle" label={"Ready for your next adventure?"}/>
                        </CallToActionContainer>

                        <CityCountryMultiSelect onChange={(selectedValues) => setSelectedOptions(selectedValues)}/>
                        <DayPickerContainer>
                            <CustomDayPicker
                                mode="range"
                                selected={selectedRange}
                                onSelect={setSelectedRange}
                                disabled={disablePastDates}
                                min={27}
                                footer={"*minimum 28 days"}
                            />
                        </DayPickerContainer>

                        {selectedRange.from && selectedRange.to && (
                            <p style={{paddingBottom: "1rem"}}>
                                You selected
                                from: {format(selectedRange.from, 'dd MMM yyyy')} to {format(selectedRange.to, 'dd MMM yyyy')}
                            </p>
                        )}
                        <Button label="Search" onClick={handleSearchClick}/>

                    </StyledContent>
                </ContentContainer>


                <PhotoContainer>
                    <Swiper
                        modules={[Autoplay, EffectFade]}
                        effect="fade"
                        spaceBetween={0}
                        slidesPerView={1}
                        loop={true}
                        autoplay={{delay: 3000, disableOnInteraction: false}}
                        speed={2000}
                        style={{height: '100%'}}
                    >
                        {[6, 4, 3].map((num) => (
                            <SwiperSlide key={num}>
                                <img src={`/home_page_photos/hero${num}.jpeg`} alt={`Hero Slide ${num}`}
                                     style={{
                                         width: '100%',
                                         height: '100%',
                                         display: 'block',
                                         objectFit: 'cover',
                                         objectPosition: 'top',
                                         margin: '0, auto'
                                     }}/>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </PhotoContainer>
            </Container>

            <IconContainer>
                {iconData.map((item, index) => (
                    <IconBox key={index} icon={item.icon} title={item.title} description={item.description}
                             iconColor="#FFFFFF"/>
                ))}
            </IconContainer>


            <StyledInfoSection>
                <StyledTextContent>
                    <Text type={"SectionTitle"} label={"The Origin"}/>

                    <Text label={`Nomadly was born out of a simple idea: to create a connected world
                            for first, occasional, and consistent nomads alike. Whether you’re a
                            professional on a travel adventure or someone working remotely, we
                            are here to make remote living a viable option by connecting through
                            reliable, verified resources and work-friendly spaces.
                     `} style={{paddingTop: '1rem'}}/>

                </StyledTextContent>
                <StyledVideoSection>
                    <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/zP7GHdH0EV4"
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>

                </StyledVideoSection>
            </StyledInfoSection>


            <StyledInfoSection>
                <div>
                    <iframe
                        src="https://lottie.host/embed/c9d64e01-54f5-4b06-b3fc-c61f182a232a/89Tb2vILqc.json"
                        style={{width: '500px', height: '500px', border: 'none'}}

                    >
                    </iframe>
                </div>

                <StyledTextContent>

                    <Text type={"SectionTitle"} label={"Our Mission"}/>

                    <Text label={`Our mission with Nomadly took shape when we realized the need to
                            make sure that global workplaces are trustworthy and well-connected.
                            Since then, we have brought together a dedicated community of remote
                            workers, explorers, and everyone in between. With Nomadly, finding
                            the right workspace, accommodation, and connections is easier than
                            ever.
                            
                             At Nomadly, we believe that the world is meant to be explored. So,
                            let’s continue to explore, connect, and grow together as we
                            contribute to new adventures in how and where we live and work.
                     `} style={{paddingTop: '1rem'}}/>

                </StyledTextContent>

            </StyledInfoSection>


            {/* Meet the Team Section */}
            <TeamSection>
                <Text type="PageTitle" label="Meet the Nomadly Team"/>
                <TeamContainer>
                    {members.map((member) => (
                        <TeamCard
                            key={member.id}
                            id={member.id}
                            name={member.name}
                            role={member.role}
                            image={member.image}
                            description={member.description}
                            social={member.linkedin}
                            email={member.email}
                        />
                    ))}
                </TeamContainer>
            </TeamSection>


            {/* <Text type="PageTitle" label="TOP DESTINATIONS" style={{textAlign: "center", padding: "2rem"}}/>

            <SwiperContainer>
                <Swiper
                    modules={[Navigation, Autoplay]}
                    spaceBetween={10}
                    slidesPerView={1}
                    loop={true}
                    navigation
                    autoplay={{delay: 3000, disableOnInteraction: false}}
                    speed={2000}
                >
                    {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                        <SwiperSlide key={num}>
                            <img
                                src={`/home_page_photos/pic${num}.jpeg`}
                                alt={`Slide ${num}`}
                                style={{width: '80%', height: 'auto', display: 'block', margin: '0 auto'}}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </SwiperContainer>*/}
        </div>
    );
};

export default HomePage;
