from django.contrib import admin
from book.models import Book, Review, Category

# Register your models here.
@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ["id", "title", "document", "price"]


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ["id", "category"]


admin.site.register(Review)