from django.urls import path
from base.views import club_views as views

urlpatterns = [

    path('', views.getClubs, name="clubs"),
    
    path('create/', views.createClub, name="club-create"),
    path('upload/', views.uploadImage, name="image-upload"),

    path('<str:pk>/events/', views.createEvent, name="create-event"),
    path('<str:pk>/reviews/', views.createClubReview, name="create-review"),
    path('<str:pk>/', views.getClub, name="club"),
    
    path('update/<str:pk>/', views.updateClub, name="club-update"),
    path('delete/<str:pk>/', views.deleteClub, name="club-delete"),
]