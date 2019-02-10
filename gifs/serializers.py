from rest_framework import serializers

from .models import TruckGif


class GifSerializer(serializers.HyperlinkedModelSerializer):
    """
    serializer class for Truck Gifs
    """

    class Meta:
        model = TruckGif
        fields = ("gif", "mp4", "preview", "title", "height", "width", "slug")
