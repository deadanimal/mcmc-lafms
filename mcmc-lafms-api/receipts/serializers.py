from datetime import datetime
from calendar import timegm
import json

from django.contrib.auth.forms import PasswordResetForm
from django.conf import settings
from django.utils.translation import gettext as _
from rest_framework import serializers
from django.utils.timezone import now

from .models import (
    Receipts
)


class ReceiptsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Receipts
        fields = '__all__'

        # fields = (
        #     'id',
        #     'name',
        #     'is_active'
        # )
