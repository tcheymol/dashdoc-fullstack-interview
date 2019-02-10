from django.db import models

# Create your models here.


class TruckGif(models.Model):
    """
    giphy GIFs representation in truckly DB
    save gif url, mp4 and preview url for better performances
    height and width

    Could save here urls / sizes of fixed height/width versions for mobile use
    """

    gif = models.URLField()
    mp4 = models.URLField()
    preview = models.URLField()
    title = models.TextField(max_length=60, blank=False, null=False)
    height = models.PositiveSmallIntegerField()
    width = models.PositiveSmallIntegerField()
    slug = models.SlugField(unique=True, blank=False, null=False)

    def __str__(self):
        """ pretty print as its title """
        return self.title
