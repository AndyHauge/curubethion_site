from django.db import models
from django.urls import reverse

# Create your models here.

class Link(models.Model):
    display_name = models.CharField(max_length=35, help_text='Name as displayed on page')
    link_url = models.CharField(max_length=100, help_text='Full URL for link')
    description = models.CharField(max_length=280, help_text='Description to accompany link')
    link_category = models.ForeignKey('Category', on_delete=models.CASCADE,)

    def __str__(self):
        return self.display_name

class Category(models.Model):
    slug_name = models.CharField(max_length=25, help_text='Display name for category page')
    display_name = models.CharField(max_length=25, help_text='Display name for category page')
    description = models.TextField(help_text='Content of category page')

    def get_absolute_url (self):
        return reverse('category-list-view', args=[str(self.slug_name)])

    def __str__(self):
        return self.display_name