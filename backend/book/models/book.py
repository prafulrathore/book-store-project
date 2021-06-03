from pyexpat import model
from django.db import models

from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _

# from book.models.category import category

# Create your models here.
class Book(models.Model):
    title = models.CharField(default="", max_length=100)
    author = models.ManyToManyField(User)
    document = models.FileField(upload_to="media/documents")
    price = models.IntegerField(default=0)

    class Meta:
        verbose_name = _("Book")
        verbose_name_plural = _("Books")

    def __str__(self):
        return f"{self.title} by {self.author}"


class Review(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    text = models.TextField()
