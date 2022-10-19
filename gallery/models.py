from django.db import models
from django.urls import reverse

# Create your models here.

class Image(models.Model):
    title = models.CharField(max_length=50, help_text='Title of art')
    img_url = models.CharField(max_length=200, help_text='URL for art file')
    description = models.CharField(max_length=280, help_text='Supplementary description of art')
    img_tag = models.ManyToManyField('Tag', help_text='Select tags to apply to this art')
    date_created = models.DateField(help_text='Date art was created/last saved')
    production_ready = models.BooleanField(help_text='Is this image ready for deploy?')

    def __str__(self):
        return self.title

class Tag(models.Model):
    display_name = models.CharField(max_length=25, help_text='Displayed name of tag')
    """Accessed with many to many key on images because images can have many tags"""
    def __str__(self):
        return self.display_name