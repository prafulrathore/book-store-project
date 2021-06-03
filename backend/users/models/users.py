from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _
from rest_framework.authtoken.models import Token
from django.db.models.signals import post_save
from django.dispatch import receiver
from .timestamp import TimeStampMixin


# Create your models here.
# class User(AbstractUser):
#     pass

#     class meta:
#         verbose_name = _("User")
#         verbose_name_plural = _("Users")


# class Profile(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
#     avatar = models.TextField(help_text="Upload image in base64 format only")
#     dob = models.DateField(blank=True)

#     class meta:
#         verbose_name = _("User Profile")
#         verbose_name_plural = _("User Profiles")

#     def __str__(self):
#         return f"{self.user}"


# class AvatarLimit(models.Model):
#     extension = models.CharField(
#         default="png, jpg, gif",
#         max_length=100,
#         help_text="File should be written in given format",
#     )
#     pixel_size = models.CharField(
#         default="64*64",
#         max_length=100,
#         help_text="Pixel size should be width*height format",
#     )
#     Kb_size = models.CharField(
#         default="100",
#         max_length=100,
#         help_text="Kb size should be postive integer number",
#     )

#     class meta:
#         verbose_name = "Default Avatar Limitation"
#         verbose_name_plural = _("Default Avatar Limitations")
