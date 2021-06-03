from django.db import models
from django.utils.translation import gettext_lazy as _

# Create your models here.
class Category(models.Model):
    category = models.CharField(max_length=100)

    class Meta :
        verbose_name = _("Book Category")
        verbose_name_plural = _("Book Categories")

    def __str__(self):
        return f"{self.category}"    
