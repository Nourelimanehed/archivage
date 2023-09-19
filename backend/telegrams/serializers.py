from rest_framework import serializers
from .models import Telegram, Attachment 
from django.contrib.auth import get_user_model


UserModel = get_user_model()


UserModel = get_user_model()
class TelegramSerializer(serializers.ModelSerializer):
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


class TelegramDetailSerializer(serializers.Serializer):
    sender_info = serializers.SerializerMethodField()
    receiver_info = serializers.SerializerMethodField()
    attachment_telegram = AttachmentSerializer(many=True, read_only=True, source='attachments')

    def get_sender_info(self, obj):
        try:
            sender = UserModel.objects.get(email=obj.sender)
            return {"email": sender.email, "details": sender.details}
        except UserModel.DoesNotExist:
            return {"email": obj.sender, "details": "Aucune information supplémentaire disponible"}

    def get_receiver_info(self, obj):
        try:
            receiver = UserModel.objects.get(email=obj.receiver)
            return {"email": receiver.email, "details": receiver.details}
        except UserModel.DoesNotExist:
            return {"email": obj.receiver, "details": "Aucune information supplémentaire disponible"}