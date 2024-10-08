export const SelectTravelsList=[
    {
        id:1,
        title:'Just Me',
        desc:'A solo travelers in exploration',
        icon:'✈︎',
        people:'1'
    },
    {
        id:2,
        title:'Couple',
        desc:'Two travelers in tandem',
        icon:'🥂',
        people:'2 People'
    },
    {
        id:3,
        title:'Family',
        desc:'A group of fun loving adv',
        icon:'🏠',
        people:'3 to 5 People'
    },
    {
        id:4,
        title:'Friends',
        desc:'A bunch of thrill-seeks',
        icon:'⛵',
        people:'5 to 10 People'
    },


]

export const SelectBudgetOptions=[
    {
        id: 1,
        title: 'Cheap',
        desc: 'Stay conscious of costs',
        icon: '💵'
    },
    {
        id: 2,
        title: 'Moderate',
        desc: 'Keep cost on the average side',
        icon:'💰',
    },
    {
        id: 3,
        title: 'Luxury',
        desc: "Don't worry about cost",
        icon:'💸',
    },

]

export const AI_PROMPT='Generate Travel Plan for Location : {location} for {totalDays} Days for {traveler} with a {budget} budget, Give me Hotels options list with Hotel Name, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Time, Place Details, Place Address, Place Image Url, Geo Coordinates, ticket Pricing, rating, Travel time in hours each of the location for {totalDays} days with each day plan with best time to visit in JSON format. This prompt is designed to elicit highly detailed and reliable travel planning data from an AI system.'