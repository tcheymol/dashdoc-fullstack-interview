# Generated by Django 2.0 on 2017-12-05 17:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [("gifs", "0002_auto_20171205_1341")]

    operations = [
        migrations.AddField(
            model_name="truckgifs",
            name="slug",
            field=models.SlugField(default=1),
            preserve_default=False,
        )
    ]
