from rest_framework import serializers
from .models import Room, OccupiedDate,RoomImage
from .models import User




class RoomImageSerializer(serializers.ModelSerializer):
    
    room = serializers.HyperlinkedRelatedField(
        view_name='room-detail',
        queryset=Room.objects.all()
    )
    image = serializers.SerializerMethodField()

    def get_image(self, obj):
        request = self.context.get('request')
        if obj.image and hasattr(obj.image, 'url'):
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None

    
    class Meta:
        model = RoomImage
        fields = ['id', 'image', 'caption','room',]




class OccupiedDateSerializer(serializers.HyperlinkedModelSerializer):
    room = serializers.HyperlinkedRelatedField(
        view_name='room-detail',
        queryset=Room.objects.all()
    )
    room_name = serializers.ReadOnlyField(source='room.name')
    room_type = serializers.ReadOnlyField(source='room.type')
    user = serializers.HyperlinkedRelatedField(
        view_name='user-detail',
        queryset=User.objects.all()
    )

    class Meta:
        model = OccupiedDate
        fields = ['url', 'id', 'room', 'room_name', 'room_type', 'user', 'date']


class RoomSerializer(serializers.HyperlinkedModelSerializer):
    occupiedDates = OccupiedDateSerializer(many=True,read_only=True)
    images = RoomImageSerializer(many=True, read_only=True)
    class Meta:
        model = Room
        fields = ['url', 'id', 'name', 'type', 'pricePerNight', 'currency', 'maxOccupancy','occupiedDates', 'description','images']





from django.contrib.auth.hashers import make_password
class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'id', 'username','password','email','full_name']

      # Hash the password before saving     
    def validate_password(self, value):
        return make_password(value)
