from django.contrib import admin
from book.models import Book, Review

# Register your models here.
@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ["id", "title", "document", "price"]


admin.site.register(Review)