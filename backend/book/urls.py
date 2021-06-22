from django import views
from django.urls import path
from book import views

urlpatterns = [
    path("create/", views.BookCreateAPIView.as_view(), name="book-create"),
    path("book-list/", views.BookList.as_view(), name="booklist"),
    path("detail/<int:pk>/", views.BookDetail.as_view(), name="book-detail"),
    path("delete/<int:pk>/", views.BookDelete.as_view(), name="book-delete"),
    path("update/<int:pk>/", views.BookUpdate.as_view(), name="book-update"),
    path("searchbook/<title>/", views.SearchBook.as_view(), name="searchbook"),
]