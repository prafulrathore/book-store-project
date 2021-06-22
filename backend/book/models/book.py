from django.db import models

from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _

from .category import Category

# Create your models here.
def upload_path(instance, filename):
    return "/".join(["covers", str(instance.title), filename])


def upload_pdf_path(instance, filename):
    return "/".join(["pdf", str(instance.title), filename])


class Book(models.Model):
    title = models.CharField(default="", max_length=100)
    author = models.ManyToManyField(User, related_name="user")
    document = models.FileField(blank=True, upload_to=upload_path)
    pdf = models.FileField(blank=True, upload_to=upload_pdf_path)
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, related_name="items", default=1
    )
    price = models.IntegerField(default=0)

    class Meta:
        verbose_name = _("Book")
        verbose_name_plural = _("Books")

    def __str__(self):
        return f"{self.title}"


class Review(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    text = models.TextField()
