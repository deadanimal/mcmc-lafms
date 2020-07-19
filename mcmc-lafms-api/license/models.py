# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import uuid

from django.contrib.gis.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

from simple_history.models import HistoricalRecords

from core.helpers import PathAndRename


class License(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255, blank=True)
    nric = models.CharField(max_length=12, default='NA')
    # STATUS = [
    #     ('CO', 'Company'),
    #     ('PA', 'Partnership')
    #     ('IN', 'Individual')
    #     ('SO', 'Society')
    #     ('OT', 'Others')
    # ]
    # company_status = models.CharField(
    #     max_length=2,
    #     choices=STATUS,
    #     default='OP'
    # )
    address = models.CharField(max_length=255, blank=True)
    general_description = models.CharField(max_length=255, blank=True)
    email = models.CharField(max_length=255, blank=True)
    signature = models.CharField(max_length=255, blank=True)
    office_number = models.CharField(max_length=255, blank=True)
    fax = models.CharField(max_length=255, blank=True)
    mobile_number = models.CharField(max_length=255, blank=True)
    # APPSTATUS = [
    #     ('CO', 'Company'),
    #     ('PA', 'Partnership')
    #     ('IN', 'Individual')
    #     ('SO', 'Society')
    #     ('OT', 'Others')
    # ]
    # application_status = models.CharField(
    #     max_length=2,
    #     choices=APPSTATUS,
    #     default='CO'
    # )

    # office_number = PhoneNumberField(null=True,blank=True)
    # birth_date = models.DateTimeField(null=True, blank=True)

    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name
