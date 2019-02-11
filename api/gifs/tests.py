from django.contrib.auth.models import User
from rest_framework.test import APITestCase, APIClient

from .models import TruckGif


class TestGifs(APITestCase):
    def setUp(self):
        self.regular_user = User.objects.create_user("regular", None, None)
        self.staff_user = User.objects.create_superuser("staff", None, None)
        self.fake = {
            "gif": "https://media1.giphy.com/media/z4IvwOSbTCQo0/giphy.gif",
            "height": 1024,
            "mp4": "https://media1.giphy.com/media/z4IvwOSbTCQo0/giphy.mp4",
            "preview": "https://media1.giphy.com/media/z4IvwOSbTCQo0/giphy-preview.mp4",
            "slug": "totally-not-z4IvwOSbTCQo0",
            "title": "totally not fake gif",
            "width": 1600,
        }

    def get_client(self, staff=False):
        client = APIClient()
        if staff:
            client.force_authenticate(self.staff_user)
        else:
            client.force_authenticate(self.regular_user)
        return client

    def test_not_authentificated(self):
        client = APIClient()
        self.assertEqual(client.post("/api/fetch/").status_code, 403)
        self.assertEqual(client.get("/api/gifs/").status_code, 403)

    def test_fetch(self):
        client = self.get_client()
        resp = client.post("/api/fetch/")
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(TruckGif.objects.all().count(), 10)
        self.assertEqual(len(resp.data["results"]), 10)

    def test_crud(self):
        client = self.get_client(True)
        # Create
        resp = client.post("/api/gifs/", self.fake)
        self.assertEqual(resp.status_code, 201)
        gif = TruckGif.objects.filter(slug=self.fake["slug"])
        self.assertTrue(gif.exists())
        gif = gif.get()

        # Retrieve
        self.assertEqual(client.get("/api/gifs/{}/".format(gif.id)).status_code, 200)

        # Update
        new = self.fake
        new["title"] = "changed_title"
        self.assertEqual(client.put("/api/gifs/{}/".format(gif.id), new).status_code, 200)
        self.assertTrue(TruckGif.objects.filter(title=new["title"]).exists())

        # Delete
        self.assertEqual(client.delete("/api/gifs/{}/".format(gif.id)).status_code, 204)
        self.assertEqual(client.delete("/api/gifs/{}/".format(gif.id)).status_code, 404)
        self.assertFalse(TruckGif.objects.filter(slug=self.fake["slug"]).exists())

    def test_delete_permission(self):
        gif = TruckGif.objects.create(**self.fake)

        client = self.get_client()
        self.assertEqual(client.delete("/api/gifs/{}/".format(gif.id)).status_code, 403)

        client = self.get_client(True)
        self.assertEqual(client.delete("/api/gifs/{}/".format(gif.id)).status_code, 204)
