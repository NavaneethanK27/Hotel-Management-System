
import os
import django
from django.core.files import File

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Booking_App.settings')
django.setup()

from RoomBooking.models import Room, RoomImage

# Data for rooms and images
rooms_data = [
    {
        "name": "Luxury Suite",
        "type": "suite",
        "pricePerNight": 450,
        "currency": "USD",
        "maxOccupancy": 2,
        "description": "A stunning luxury hotel suite with a king-size bed and city views.",
        "image_path": r"C:\Users\naveen\OneDrive\Desktop\Hotel Booking System\luxury_hotel_room_1.png"
    },
    {
        "name": "Deluxe Room",
        "type": "deluxe",
        "pricePerNight": 250,
        "currency": "USD",
        "maxOccupancy": 2,
        "description": "A modern deluxe hotel room with a minimalist aesthetic and garden view.",
        "image_path": r"C:\Users\naveen\OneDrive\Desktop\Hotel Booking System\deluxe_hotel_room_2.png"
    },
    {
        "name": "Standard Room",
        "type": "standard",
        "pricePerNight": 150,
        "currency": "USD",
        "maxOccupancy": 2,
        "description": "A bright and clean standard hotel room with two twin beds.",
        "image_path": r"C:\Users\naveen\OneDrive\Desktop\Hotel Booking System\standard_hotel_room_3.png"
    }
]


def add_rooms_and_images():
   
    actual_paths = [
        r"C:\Users\naveen\OneDrive\Desktop\Hotel Booking System\luxury_hotel_room_1.png",
        r"C:\Users\naveen\OneDrive\Desktop\Hotel Booking System\deluxe_hotel_room_2.png",
        r"C:\Users\naveen\OneDrive\Desktop\Hotel Booking System\standard_hotel_room_3.png"
    ]
    
    for i, data in enumerate(rooms_data):
        room, created = Room.objects.get_or_create(
            name=data["name"],
            defaults={
                "type": data["type"],
                "pricePerNight": data["pricePerNight"],
                "currency": data["currency"],
                "maxOccupancy": data["maxOccupancy"],
                "description": data["description"]
            }
        )
        if created:
            print(f"Created room: {room.name}")
        else:
            print(f"Room already exists: {room.name}")

        image_path = actual_paths[i]
        if os.path.exists(image_path):
            print(f"Adding image for {room.name}...")
            with open(image_path, "rb") as f:
                ri = RoomImage(room=room, caption=f"View of {room.name}")
                ri.image.save(os.path.basename(image_path), File(f), save=True)
                print(f"Added image to {room.name}")
        else:
            print(f"Image not found: {image_path}")

if __name__ == "__main__":
    add_rooms_and_images()
