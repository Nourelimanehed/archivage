from rest_framework import serializers
from .models import Telegram, Attachment 
from user_api.serializers import UserSerializer




class TelegramSerializer(serializers.ModelSerializer):
    sender = UserSerializer()  
    receiver = UserSerializer()  
    class Meta:
        model = Telegram
        fields = '__all__' 

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