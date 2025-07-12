interface Listing {
  id: string;
  title: string;
  price: number;
  roomNumber: number;
  createdAt: Date;
  location: string;
  // Add other fields as needed
}

interface ListingSite {
  query: (params: {
    maxPrice: number;
    minRoomNumber: number;
    listingsNewerThan: Date;
  }) => Listing[];
}

type GoogleMapsCommuteTime = (listing: Listing) => number;

export function checkForNewFlats(
  maxPrice: number,
  minRoomNumber: number,
  previousCheckTime: Date,
  listingSites: ListingSite[],
  googleMapsCommuteTime: GoogleMapsCommuteTime
): Set<Listing> {
  // kelmich-highlight-start
  const newListings: Set<Listing> = new Set();

  for (const site of listingSites) {
    const newSiteListings = site.query({
      maxPrice,
      minRoomNumber,
      listingsNewerThan: previousCheckTime,
    });

    for (const newListing of newSiteListings) {
      const travelTime = googleMapsCommuteTime(newListing);
      if (travelTime < 20) {
        newListings.add(newListing);
      }
    }
  }

  return newListings;
  // kelmich-highlight-end
}
