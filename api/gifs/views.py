import giphy_client
from giphy_client.rest import ApiException

from django.conf import settings
from django.db import transaction

from rest_framework.exceptions import APIException
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, ViewSet

from .models import TruckGif
from .serializers import TruckGifSerializer
from .permissions import HasGifPermission


class GiphyException(APIException):
    """
    User Friendly giphy exception
    """

    status_code = 503
    default_detail = "Giphy Service temporarily unavailable, try again later."
    default_code = "service_unavailable"


class GetGifs:
    """
    Simple class to fetch gifs from giphy api and format them for the DB
    By default search for 10 trucks gifs, can be overridden
    """

    __slots__ = ("api_instance",)

    def __init__(self):
        """
        Initialize giphy api client
        """
        self.api_instance = giphy_client.DefaultApi()

    def fetch_gifs(self, search="trucks", number=10, rating="g"):
        """
        Fetch gifs on giphy api, send user friendly exception on error
        """
        try:
            return self.api_instance.gifs_search_get(
                settings.GIPHY_API_KEY,
                search,
                limit=number,
                rating=rating,
                offset=TruckGif.objects.count(),  # not really accurate but an easy way of tracking the offset
            ).data
        except ApiException as e:
            raise GiphyException("can't fetch gifs from giphy")

    def get_gifs(self, search="trucks", number=10):
        return (
            TruckGif(
                gif=gif.images.original.url,
                mp4=gif.images.original.mp4,
                preview=gif.images.preview.mp4,
                title=gif.title,
                height=gif.images.original.height,
                width=gif.images.original.width,
                slug=gif.slug,
            )
            for gif in self.fetch_gifs(search=search, number=number)
        )


class FetchViewSet(ViewSet):
    """
    ViewSet providing only the post endpoint, fetching 10 trucks gifs from
    giphy and saving them on the DB
    """

    def create(self, request):
        """
        create is the only viewset method mapped to the POST method (kind of a
        bad naming, shame it can't be overrided with decorators, only using it
        to forward to more explicitly named method)
        """
        return self.fetch_gifs(request)

    @transaction.atomic
    def fetch_gifs(self, request):
        """
        fetch gifs, save them to the DB, and return them
        don't save them if already in DB
        atomic, don't let concurrency create duplicates
        """
        fetched_gifs = list(GetGifs().get_gifs())

        # Filter out duplicates
        dupes = TruckGif.objects.filter(slug__in=(gif.slug for gif in fetched_gifs))
        unduplicated_gifs = list(
            filter(lambda gif: gif.slug not in (dup.slug for dup in dupes), fetched_gifs)
        )

        saved = TruckGif.objects.bulk_create(unduplicated_gifs)

        response_gifs = (*TruckGif.objects.filter(slug__in=(gif.slug for gif in saved)), *dupes)

        return Response(
            {
                "results": TruckGifSerializer(
                    response_gifs, many=True, context={"request": request}
                ).data
            }
        )


class GifViewSet(ModelViewSet):
    """
    Viewset to provide all CRUD+ operations for GIFs
    """

    queryset = TruckGif.objects.all()
    serializer_class = TruckGifSerializer
    permission_classes = [HasGifPermission]
