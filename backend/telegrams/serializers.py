from rest_framework import serializers
from .models import Telegram, Attachment 
from user_api.serializers import UserSerializer
from user_api.models import AppUser




from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Telegram
from user_api.models import AppUser

UserModel = get_user_model()

class TelegramSerializer(serializers.ModelSerializer):
    sender_email = serializers.EmailField(write_only=True)
    receiver_email = serializers.EmailField(write_only=True)

    class Meta:
        model = Telegram
        fields = '__all__'

    def create(self, validated_data):
        # Extract sender and receiver emails from the validated data
        sender_email = validated_data.pop('sender_email', None)
        receiver_email = validated_data.pop('receiver_email', None)

        # Look up sender and receiver user objects by email
        try:
            sender = AppUser.objects.get(email=sender_email)
            receiver = AppUser.objects.get(email=receiver_email)
        except AppUser.DoesNotExist:
            raise serializers.ValidationError({"detail": "Sender or receiver not found."})

        # Create and return the Telegram object
        return Telegram.objects.create(sender=sender, receiver=receiver, **validated_data)


class AttachmentSerializer(serializers.ModelSerializer):
    attachment = serializers.SerializerMethodField()
    telegram = TelegramSerializer()

    def get_attachment(self, obj):
        return obj.attachment.url

    class Meta:
        model = Attachment
        fields = '__all__' 

class TelegramDetailsSerializer(serializers.ModelSerializer):
    sender = UserSerializer()  
    receiver = UserSerializer()
    attachment_telegram = AttachmentSerializer(many=True, read_only=True, source='attachments')
    
    class Meta:
        model = Telegram
        fields = '__all__'