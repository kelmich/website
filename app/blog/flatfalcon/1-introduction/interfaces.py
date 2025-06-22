from datetime import datetime, timedelta

class Listing:
    pass

class ListingSite:
    def query(self, listings_newer_than: datetime, max_price: int, min_room_number: float) -> set[Listing]:
        ...

listing_sites: list[ListingSite] = []

max_price: int = 3000
min_room_number: float = 4.5
previous_q_time = datetime.now() - timedelta(days=1)
