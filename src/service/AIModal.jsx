import { GoogleGenerativeAI } from "@google/generative-ai";

  
  const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
 
  export const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {text: "Generate Travel Plan for Location: Las Vegas, for 3 Days for Couple with a Cheap budget,Give me a Hotels options list with Hotel Name, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Time, Place Details, Place Address, Place Image Url, Geo Coordinates, ticket Pricing, rating and Travel time in hours each of the location for 3 days with each day plan with best time to visit in JSON format. This prompt is designed to elicit highly detailed and reliable travel planning data from an AI system."},
        ],
      },
      {
        role: "model",
        parts: [
		 {text: "```json\n{\n  \"hotelOptions\": [\n    {\n      \"hotelName\": \"The D Las Vegas\",\n      \"hotelAddress\": \"301 Fremont Street, Las Vegas, NV 89101\",\n      \"price\": \"$50-$100 per night\",\n      \"hotelImageUrl\": \"https://www.the-d.com/images/hero-images/hero-banner-desktop.jpg\",\n      \"geoCoordinates\": \"36.1699° N, 115.1421° W\",\n      \"rating\": 4.0,\n      \"description\": \"A budget-friendly hotel located in the heart of Fremont Street Experience, offering a casino, restaurants, and live entertainment.\"\n    },\n    {\n      \"hotelName\": \"Golden Nugget Las Vegas\",\n      \"hotelAddress\": \"129 E Fremont St, Las Vegas, NV 89101\",\n      \"price\": \"$75-$150 per night\",\n      \"hotelImageUrl\": \"https://www.goldennugget.com/las-vegas/media/images/hotel-exterior-01.jpg\",\n      \"geoCoordinates\": \"36.1698° N, 115.1415° W\",\n      \"rating\": 4.5,\n      \"description\": \"A historic hotel known for its luxurious amenities, including a shark tank aquarium, a casino, and multiple dining options.\"\n    },\n    {\n      \"hotelName\": \"Circus Circus Hotel & Casino\",\n      \"hotelAddress\": \"2880 S Las Vegas Blvd, Las Vegas, NV 89109\",\n      \"price\": \"$40-$80 per night\",\n      \"hotelImageUrl\": \"https://www.circuscircus.com/content/dam/MGMResorts/CircusCircus/images/hero-images/CircusCircus-hero-1-desktop.jpg\",\n      \"geoCoordinates\": \"36.0989° N, 115.1737° W\",\n      \"rating\": 3.5,\n      \"description\": \"A family-friendly hotel offering circus-themed entertainment, a casino, and multiple dining options.\"\n    }\n  ],\n  \"itinerary\": [\n    {\n      \"day\": \"Day 1\",\n      \"plan\": [\n        {\n          \"placeName\": \"Fremont Street Experience\",\n          \"time\": \"10:00 AM - 1:00 PM\",\n          \"placeDetails\": \"Walk down the pedestrian-friendly street with its vibrant light shows and free concerts.  Enjoy street performers and grab a cheap bite to eat.\",\n          \"placeAddress\": \"Fremont Street, Las Vegas, NV 89101\",\n          \"placeImageUrl\": \"https://www.vegasexperience.com/images/articles/fremont-street-experience.jpg\",\n          \"geoCoordinates\": \"36.1699° N, 115.1421° W\",\n          \"ticketPricing\": \"Free\",\n          \"rating\": 4.5,\n          \"travelTime\": \"0 hours\"\n        },\n        {\n          \"placeName\": \"Neon Museum\",\n          \"time\": \"1:00 PM - 3:00 PM\",\n          \"placeDetails\": \"Explore the history of Las Vegas through its iconic neon signs, with both indoor and outdoor exhibits.\",\n          \"placeAddress\": \"770 N Las Vegas Blvd, Las Vegas, NV 89101\",\n          \"placeImageUrl\": \"https://www.neonmuseum.org/wp-content/uploads/2022/02/NeonMuseum-Main-Facade.jpg\",\n          \"geoCoordinates\": \"36.1771° N, 115.1476° W\",\n          \"ticketPricing\": \"$25\",\n          \"rating\": 4.0,\n          \"travelTime\": \"15 minutes\"\n        },\n        {\n          \"placeName\": \"The Mob Museum\",\n          \"time\": \"3:00 PM - 5:00 PM\",\n          \"placeDetails\": \"Learn about the history of organized crime in Las Vegas and the surrounding area.\",\n          \"placeAddress\": \"300 Stewart Ave, Las Vegas, NV 89101\",\n          \"placeImageUrl\": \"https://www.themobmuseum.org/media/1674/mob-museum-exterior.jpg\",\n          \"geoCoordinates\": \"36.1708° N, 115.1424° W\",\n          \"ticketPricing\": \"$25\",\n          \"rating\": 4.5,\n          \"travelTime\": \"10 minutes\"\n        },\n        {\n          \"placeName\": \"Dinner at a Cheap Eatery on Fremont Street\",\n          \"time\": \"5:00 PM - 7:00 PM\",\n          \"placeDetails\": \"Enjoy a budget-friendly dinner at one of the many affordable restaurants on Fremont Street.\",\n          \"placeAddress\": \"Fremont Street, Las Vegas, NV 89101\",\n          \"placeImageUrl\": \"https://www.vegasexperience.com/images/articles/fremont-street-experience.jpg\",\n          \"geoCoordinates\": \"36.1699° N, 115.1421° W\",\n          \"ticketPricing\": \"Varies\",\n          \"rating\": 4.0,\n          \"travelTime\": \"0 hours\"\n        }\n      ]\n    },\n    {\n      \"day\": \"Day 2\",\n      \"plan\": [\n        {\n          \"placeName\": \"Bellagio Fountains Show\",\n          \"time\": \"11:00 AM - 1:00 PM\",\n          \"placeDetails\": \"Watch the spectacular water and light show at the Bellagio Hotel.\",\n          \"placeAddress\": \"3600 S Las Vegas Blvd, Las Vegas, NV 89109\",\n          \"placeImageUrl\": \"https://www.bellagio.com/content/dam/MGMResorts/Bellagio/images/hero-images/Bellagio-fountains-desktop-1.jpg\",\n          \"geoCoordinates\": \"36.1188° N, 115.1716° W\",\n          \"ticketPricing\": \"Free\",\n          \"rating\": 4.5,\n          \"travelTime\": \"30 minutes\"\n        },\n        {\n          \"placeName\": \"The Strip (Walk/Bus)\",\n          \"time\": \"1:00 PM - 4:00 PM\",\n          \"placeDetails\": \"Explore the iconic Las Vegas Strip, visiting various casinos and enjoying the atmosphere.  Take advantage of free shows, people-watching, and enjoying the architecture.\",\n          \"placeAddress\": \"Las Vegas Blvd, Las Vegas, NV 89109\",\n          \"placeImageUrl\": \"https://www.visitlasvegas.com/media/1158/the-strip.jpg\",\n          \"geoCoordinates\": \"36.1154° N, 115.1721° W\",\n          \"ticketPricing\": \"Free\",\n          \"rating\": 5.0,\n          \"travelTime\": \"0 hours\"\n        },\n        {\n          \"placeName\": \"Free Buffet at Casino\",\n          \"time\": \"4:00 PM - 6:00 PM\",\n          \"placeDetails\": \"Many casinos offer free buffets to attract guests, so take advantage of this opportunity for a budget-friendly meal.\",\n          \"placeAddress\": \"Various locations on The Strip\",\n          \"placeImageUrl\": \"https://www.casino.org/images/articles/buffet-food.jpg\",\n          \"geoCoordinates\": \"N/A\",\n          \"ticketPricing\": \"Free\",\n          \"rating\": 4.0,\n          \"travelTime\": \"0 hours\"\n        },\n        {\n          \"placeName\": \"Free Show at a Casino\",\n          \"time\": \"6:00 PM - 8:00 PM\",\n          \"placeDetails\": \"Many casinos offer free shows, including music, dance, and magic acts.  Check the schedules and enjoy a free night of entertainment.\",\n          \"placeAddress\": \"Various locations on The Strip\",\n          \"placeImageUrl\": \"https://www.casino.org/images/articles/buffet-food.jpg\",\n          \"geoCoordinates\": \"N/A\",\n          \"ticketPricing\": \"Free\",\n          \"rating\": 4.0,\n          \"travelTime\": \"0 hours\"\n        }\n      ]\n    },\n    {\n      \"day\": \"Day 3\",\n      \"plan\": [\n        {\n          \"placeName\": \"Hoover Dam\",\n          \"time\": \"9:00 AM - 1:00 PM\",\n          \"placeDetails\": \"Take a day trip to Hoover Dam, one of the most iconic engineering marvels in the world.  You can take a tour inside the dam, explore the visitor center, and enjoy the scenic views.\",\n          \"placeAddress\": \"Hoover Dam, NV 89022\",\n          \"placeImageUrl\": \"https://www.nps.gov/hdam/learn/nature/images/Hoover-Dam-Exterior.jpg\",\n          \"geoCoordinates\": \"36.0000° N, 114.9999° W\",\n          \"ticketPricing\": \"$30\",\n          \"rating\": 4.5,\n          \"travelTime\": \"1.5 hours\"\n        },\n        {\n          \"placeName\": \"Lake Mead National Recreation Area\",\n          \"time\": \"1:00 PM - 3:00 PM\",\n          \"placeDetails\": \"Enjoy the natural beauty of Lake Mead, the largest reservoir in the United States by volume.  Go for a swim, rent a boat, or simply relax on the beach.\",\n          \"placeAddress\": \"Lake Mead National Recreation Area, NV 89010\",\n          \"placeImageUrl\": \"https://www.nps.gov/lame/planyourvisit/images/LakeMead_Sunset.jpg\",\n          \"geoCoordinates\": \"36.1651° N, 114.7109° W\",\n          \"ticketPricing\": \"Free\",\n          \"rating\": 4.0,\n          \"travelTime\": \"1 hour\"\n        },\n        {\n          \"placeName\": \"Red Rock Canyon National Conservation Area\",\n          \"time\": \"3:00 PM - 5:00 PM\",\n          \"placeDetails\": \"Explore the stunning rock formations and scenic trails of Red Rock Canyon, located just a short drive from Las Vegas.\",\n          \"placeAddress\": \"1000 Red Rock Canyon Rd, Las Vegas, NV 89161\",\n          \"placeImageUrl\": \"https://www.nps.gov/redr/learn/nature/images/Red_Rock_Canyon_National_Conservation_Area_IMG_6814.jpg\",\n          \"geoCoordinates\": \"36.1569° N, 115.2378° W\",\n          \"ticketPricing\": \"$15\",\n          \"rating\": 4.5,\n          \"travelTime\": \"45 minutes\"\n        }\n      ]\n    }\n  ]\n}\n```\n\n**Please Note:**\n* **Prices are approximate:**  These prices are subject to change based on the time of year, demand, and availability. \n* **Travel Times:** The travel times are estimated and may vary depending on traffic.\n* **Ratings:**  Ratings are based on user reviews and can vary.\n* **Images:** The image URLs provided are representative of the places and may not be from the official sources.\n* **Ticket Pricing:** Ticket prices are subject to change and can be purchased online or at the location.\n\n**Tips for a Cheap Budget:**\n\n* **Free Activities:** Take advantage of free shows, attractions, and activities. Many casinos offer free buffets and drinks with a player's card.\n* **Transportation:** Walk or use public transportation to save money. The Las Vegas Monorail and the Deuce bus are affordable options.\n* **Dining:** Explore affordable restaurants on Fremont Street or find deals and coupons online.\n* **Entertainment:**  Look for free concerts and events happening around town.\n* **Shopping:**  Shop for souvenirs at discount stores or outlet malls to save money.\n\nEnjoy your trip to Las Vegas! \n"},
        ],
      },
    ],
  });
