// Function to generate image URL with specified width and height
const generateThumbnailImg = (baseUrl, width = 800, height = 600) => {
    return `${baseUrl}?w=${width}&h=${height}&fit=crop`;
};

export const properties = [
    {
        id: 1,
        image: generateThumbnailImg('https://images.unsplash.com/photo-1580587771525-78b9dba3b914'),
        title: 'Modern Apartment',
        description: 'A beautiful modern apartment in the city center.',
        price: 'CHF 1,200',
        rating: 4.3,
        city: 'Zurich',
        country: 'Switzerland'
    },
    {
        id: 2,
        image: generateThumbnailImg('https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'),
        title: 'Cozy Cottage',
        description: 'A cozy cottage with a garden.',
        price: 'CHF 750',
        rating: 5,
        city: 'Tuscany',
        country: 'Italy'
    },
    {
        id: 3,
        image: generateThumbnailImg('https://images.unsplash.com/photo-1502672023488-70e25813eb80'),
        title: 'Luxury Villa',
        description: 'A luxurious villa with a swimming pool.',
        price: 'CHF 4,000',
        rating: 4.6,
        city: 'Los Angeles',
        country: 'USA'
    },
    {
        id: 4,
        image: generateThumbnailImg('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb'),
        title: 'Modern City Apartment',
        description: 'A stylish apartment in the heart of the city.',
        price: 'CHF 1,800',
        rating: 4,
        city: 'London',
        country: 'United Kingdom'
    },
    {
        id: 5,
        image: generateThumbnailImg('https://images.unsplash.com/photo-1501183638710-841dd1904471'),
        title: 'Country Cottage',
        description: 'A quiet country cottage with lovely views.',
        price: 'CHF 1,200',
        rating: 3.5,
        city: 'Blue Mountains',
        country: 'Australia'
    },
    {
        id: 6,
        image: generateThumbnailImg('https://images.unsplash.com/photo-1523217582562-09d0def993a6'),
        title: 'Villa with Pool',
        description: 'A spacious villa with an infinity pool and sea views.',
        price: 'CHF 4,500',
        rating: 5,
        city: 'Santorini',
        country: 'Greece'
    },
    {
        id: 7,
        image: generateThumbnailImg('https://images.unsplash.com/photo-1664813953310-ea2953c0ec99'),
        title: 'Modern and Cozy Apartment',
        description: 'A modern apartment in the middle of the city.',
        price: 'CHF 1800',
        rating: 3.8,
        city: 'Tokyo',
        country: 'Japan'
    },
    {
        id: 8,
        image: generateThumbnailImg('https://images.unsplash.com/photo-1512917774080-9991f1c4c750'),
        title: 'Urban Penthouse',
        description: 'An elegant penthouse with city skyline views.',
        price: 'CHF 2,500',
        rating: 5,
        city: 'Paris',
        country: 'France'
    },
    {
        id: 9,
        image: generateThumbnailImg('https://images.unsplash.com/photo-1570129477492-45c003edd2be'),
        title: 'Lake House',
        description: 'A charming house by the lake with private dock.',
        price: 'CHF 4,200',
        rating: 5,
        city: 'Toronto',
        country: 'Canada'
    },
    {
        id: 10,
        image: generateThumbnailImg('https://images.unsplash.com/photo-1502672260266-1c1ef2d93688'),
        title: 'Alpine Chalet',
        description: 'A luxury chalet in the Alps with stunning mountain views.',
        price: 'CHF 10,000',
        rating: 5,
        city: 'Zermatt',
        country: 'Switzerland'
    },
    // Additional properties
    {
        id: 11,
        image: generateThumbnailImg('https://images.unsplash.com/photo-1519999482648-25049ddd37b1'),
        title: 'Beachside Bungalow',
        description: 'A relaxing bungalow by the beach.',
        price: 'CHF 2,200',
        rating: 4.7,
        city: 'Malibu',
        country: 'USA'
    },
    {
        id: 12,
        image: generateThumbnailImg('https://images.unsplash.com/photo-1501426026826-31c667bdf23d'),
        title: 'Mountain Cabin',
        description: 'A secluded cabin in the mountains with a fireplace.',
        price: 'CHF 1,500',
        rating: 4.8,
        city: 'Banff',
        country: 'Canada'
    },
    {
        id: 13,
        image: generateThumbnailImg('https://images.unsplash.com/photo-1501426026826-31c667bdf23d'),
        title: 'Charming Villa',
        description: 'A charming villa surrounded by nature.',
        price: 'CHF 2,000',
        rating: 4.5,
        city: 'Nice',
        country: 'France'
    },
    {
        id: 14,
        image: generateThumbnailImg('https://images.unsplash.com/photo-1507089947368-19c1da9775ae'),
        title: 'Historical Mansion',
        description: 'A grand mansion with historical significance.',
        price: 'CHF 3,500',
        rating: 4.9,
        city: 'Edinburgh',
        country: 'United Kingdom'
    },
    {
        id: 15,
        image: generateThumbnailImg('https://images.unsplash.com/photo-1570129477492-45c003edd2be'),
        title: 'Clifftop Retreat',
        description: 'A stunning retreat on top of a cliff with ocean views.',
        price: 'CHF 5,500',
        rating: 5,
        city: 'Amalfi',
        country: 'Italy'
    }
];

export const countries = [...new Set(properties.map(property => property.country))];

export const cities = [...new Set(properties.map(property => property.city))];
