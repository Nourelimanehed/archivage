from django.db import models
from user_api.models import AppUser  # Import the user model from the user_api app
from django.db import models
from django.utils import timezone
from django.template.defaultfilters import slugify


#------------------------------------------------------
def get_filename(instance, filename):
    original_filename = filename
    return f"attachments_saved/{original_filename}"

class Attachment(models.Model):
    telegram_related = models.ForeignKey(
        'Telegram',
        on_delete=models.CASCADE,
        related_name='attachments'
    )
    attachment_telegram = models.FileField(upload_to=get_filename, blank=True, null=True)

    def __str__(self):
        return str(self.attachment_telegram)
#---------------------------------
class Telegram(models.Model):
    TELEGRAM_TYPES = (
        ('depart', 'Depart'),
        ('arrive', 'Arrive'),
        ('transit', 'Transit'),
    )
    TRANSMISSION_METHODS = (
        ('Messagerie', 'Messagerie'),
        ('Fax', 'Fax'),
        ('Porte', 'Porte'),
        ('Autre', 'Autre'),
    )
    URGENCY_LEVELS = (
        ('Urgent', 'Urgent'),
        ('Semi-urgent', 'Semi-urgent'),
        ('Non urgent', 'Non urgent')
    )

    sender = models.EmailField(max_length=50)
    receiver = models.EmailField(max_length=50)
    date = models.DateTimeField()
    subject = models.CharField(max_length=255)
    content = models.TextField()
    transmission_method = models.CharField(max_length=100, choices=TRANSMISSION_METHODS)
    urgency_level = models.CharField(max_length=20, choices=URGENCY_LEVELS)
    telegram_type = models.CharField(max_length=10, choices=TELEGRAM_TYPES)

    def __str__(self):
        return self.id
