const cityData = {
    dashboard: {
        temperature: 24,
        weather: "Partly Cloudy",
        aqi: 60,
        traffic: 65 // As a percentage
    },
    alerts: [
        {
            id: 1,
            category: "Traffic",
            icon: "fa-solid fa-car-burst",
            title: "Road Closure on Main St",
            timestamp: "2025-11-17T09:30:00",
            description: "Main St. between 1st and 3rd Ave will be closed for emergency sewer repairs. Please use alternate routes."
        },
        {
            id: 2,
            category: "Health",
            icon: "fa-solid fa-notes-medical",
            title: "New Community Vaccination Drive",
            timestamp: "2025-11-17T08:00:00",
            description: "A new vaccination drive for all eligible citizens will be held at City Hall on Nov 20th. Walk-ins welcome."
        },
        {
            id: 3,
            category: "Weather",
            icon: "fa-solid fa-cloud-showers-heavy",
            title: "Heavy Rain Advisory Issued",
            timestamp: "2025-11-16T18:45:00",
            description: "The National Weather Service has issued a heavy rain advisory for the next 24 hours. Expect localized flooding."
        },
        {
            id: 4,
            category: "Public",
            icon: "fa-solid fa-gavel",
            title: "Change in Public Library Hours",
            timestamp: "2025-11-15T14:00:00",
            description: "Starting Dec 1st, all public libraries will operate from 10:00 AM to 6:00 PM, Tuesday to Saturday."
        },
        {
            id: 5,
            category: "Traffic",
            icon: "fa-solid fa-traffic-light",
            title: "New Traffic Signals Active on 5th Ave",
            timestamp: "2025-11-15T11:00:00",
            description: "The new traffic signals at the intersection of 5th Ave and Oak St are now operational. Please drive with caution."
        }
    ],
    mapZones: {
        hospital: {
            icon: "fa-solid fa-hospital",
            title: "City General Hospital",
            info: "Main emergency and trauma center. Open 24/7.",
            contact: "Contact: (555) 123-4567"
        },
        park: {
            icon: "fa-solid fa-tree",
            title: "Central Park",
            info: "Public park with jogging tracks, a lake, and picnic areas.",
            contact: "Hours: 6:00 AM - 10:00 PM"
        },
        school: {
            icon: "fa-solid fa-school",
            title: "Metropolis High School",
            info: "Public high school serving grades 9-12.",
            contact: "Office: (555) 987-6543"
        },
        mall: {
            icon: "fa-solid fa-shopping-bag",
            title: "Downtown Shopping Mall",
            info: "Features over 100 stores, a food court, and a cinema.",
            contact: "Hours: 10:00 AM - 9:00 PM"
        },
        gov: {
            icon: "fa-solid fa-building-columns",
            title: "City Hall",
            info: "Main administrative building for city services and public records.",
            contact: "Office Hours: 9:00 AM - 5:00 PM"
        }
    },
    // NEW: Data for Trust Signals
    communityStats: {
        reports: 1472,
        users: 8349,
        resolved: 91 // As a percentage
    }
};