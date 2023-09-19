from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import TelegramSerializer, AttachmentSerializer,TelegramDetailSerializer
from .models import Telegram


#-------------------- create telegram 

# Create a view function for creating a telegram
@api_view(['POST'])
def create_telegram(request):
    # Create a serializer instance using the data from the request
    telegram_serializer = TelegramSerializer(data=request.data)
    # Check if the serializer is valid
    if telegram_serializer.is_valid():
        # Extract sender and receiver emails from the request data
        sender_email = request.data.get('sender')
        receiver_email = request.data.get('receiver')
        # Create the Telegram object with sender and receiver emails
        telegram = telegram_serializer.save(sender=sender_email, receiver=receiver_email)
        # Return a 201 Created response with the serialized telegram data
        return Response(telegram_serializer.data, status=status.HTTP_201_CREATED)
    # If the serializer is not valid, return the errors
    return Response(telegram_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# ----------------------- List of all Telegrams
@api_view(['GET'])
def telegrams_list(request):
    telegrams = Telegram.objects.all()
    serializer = TelegramSerializer(telegrams, many=True)
    return Response({'telegrams': serializer.data})

# ------------------ Details Telegram
@api_view(['GET'])
def telegram_details(request, id, format=None):
    telegram = get_object_or_404(Telegram, pk=id)
    serializer = TelegramDetailSerializer(telegram)
    return Response(serializer.data)