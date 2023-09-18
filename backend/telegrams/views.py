from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import TelegramSerializer, AttachmentSerializer
from .models import Telegram
from user_api.models import AppUser

#-------------------- create telegram 

@api_view(['POST'])
def create_telegram(request):
    telegram_serializer = TelegramSerializer(data=request.data)
    if telegram_serializer.is_valid():
        sender_email = request.data.get('sender_email')
        receiver_email = request.data.get('receiver_email')

        # Look up sender and receiver user objects by email
        try:
            sender = AppUser.objects.get(email=sender_email)
            receiver = AppUser.objects.get(email=receiver_email)
        except AppUser.DoesNotExist:
            return Response({"detail": "Sender or receiver not found."}, status=status.HTTP_400_BAD_REQUEST)

        telegram = telegram_serializer.save(sender=sender, receiver=receiver)

        # Handle attachments
        attachments_data = request.FILES.getlist('attachments', [])
        attachment_serializers = [
            AttachmentSerializer(data={'telegram_related': telegram.id, 'attachment_telegram': attachment})
            for attachment in attachments_data
        ]

        # Check if all attachment serializers are valid
        if all(attachment_serializer.is_valid() for attachment_serializer in attachment_serializers):
            [attachment_serializer.save() for attachment_serializer in attachment_serializers]
            return Response(telegram_serializer.data, status=status.HTTP_201_CREATED)
        else:
            # If any attachment serializer is not valid, return the errors
            attachment_errors = [attachment_serializer.errors for attachment_serializer in attachment_serializers]
            return Response(attachment_errors, status=status.HTTP_400_BAD_REQUEST)

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
    serializer = TelegramDetailsSerializer(telegram)
    return Response(serializer.data)