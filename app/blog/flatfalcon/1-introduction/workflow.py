from typing import Callable
from datetime import datetime, timedelta
from interfaces import Listing, ListingSite


def check_for_new_flats(
    max_price: int,
    min_room_number: float,
    previous_check_time: datetime,
    listing_sites: list[ListingSite],
    google_maps_commute_time: Callable[[Listing], float]
):
    new_listings: set[Listing] = set()

    for site in listing_sites:
        # fetch all newly uploaded listings
        # that meet our size and budget requirements
        new_site_listings = site.query(
            max_price=max_price,
            min_room_number=min_room_number,
            listings_newer_than=previous_check_time
        )

        # filter out listings that are too far away
        for new_listing in new_site_listings:
            travel_time = google_maps_commute_time(new_listing)
            if travel_time < 20:
                new_listings.add(new_listing)

    return new_listings
