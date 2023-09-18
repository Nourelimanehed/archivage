from django.urls import path
from . import views

urlpatterns = [
    # List all telegrams
    path('telegrams/', views.telegrams_list, name='telegrams-list'),

    # Create a new telegram
    path('telegrams/create/', views.create_telegram, name='create-telegram'),

    # Retrieve telegram details by ID
    path('telegrams/<int:id>/', views.telegram_details, name='telegram-details'),
]