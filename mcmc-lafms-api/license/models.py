# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import uuid

from django.contrib.gis.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

from simple_history.models import HistoricalRecords

from core.helpers import PathAndRename


class License(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255, null=True, blank=True)
    nric = models.CharField(max_length=255, null=True, blank=True)
    STATUS = [
        ('CO', 'Company'),
        ('PA', 'Partnership'),
        ('IN', 'Individual'),
        ('SO', 'Society'),
        ('OT', 'Others')
    ]
    company_status = models.CharField(
        max_length=2,
        choices=STATUS,
        default='CO'
    )

    LICENSETYPE = [
        ('IL', 'Individual License'),
        ('CL', 'Class License'),
    ]
    licence_type = models.CharField(
        max_length=2,
        choices=LICENSETYPE,
        default='IL'
    )

    LICENSEDETAILSTYPE = [
        ('NE', 'New'),
        ('RE', 'Renewal'),
        ('VS', 'Variation of Special licence condition'),
        ('TR', 'Transfer'),
        ('SU', 'Surrender'),
        ('CO', 'Change of particulars'),
        ('RO', 'Replacement of licence'),
        ('CL', 'Copy of Licence Request'),
        ('RR', 'Re-Registration'),
        ('CR', 'Copy of registration notice request'),
    ]
    licence_details_type = models.CharField(
        max_length=2,
        choices=LICENSEDETAILSTYPE,
        default='NE'
    )

    address = models.CharField(max_length=255, null=True, blank=True)
    count_no = models.CharField(max_length=255, null=True, blank=True)
    general_description = models.CharField(
        max_length=255, null=True, blank=True)
    email = models.CharField(max_length=255, null=True, blank=True)
    signature = models.CharField(max_length=255, null=True, blank=True)
    note = models.CharField(max_length=255, null=True, blank=True)
    APPSTATUS = [
        ('NA', 'New Application'),
        ('RE', 'Reviewed'),
        ('RJ', 'Rejected'),
        ('EV', 'Evaluated'),
        ('AP', 'Approved'),
        ('CO', 'Completed'),
        ('EX', 'Expired')
    ]
    application_status = models.CharField(
        max_length=2,
        choices=APPSTATUS,
        default='NA'
    )

    fax = models.CharField(max_length=255, null=True, blank=True)
    mobile_number = models.CharField(max_length=255, null=True, blank=True)
    office_number = models.CharField(max_length=255, null=True, blank=True)
    # birth_date = models.DateTimeField(null=True, blank=True)

    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    company_name = models.CharField(max_length=255, null=True, blank=True)
    reg_date = models.CharField(max_length=255, null=True, blank=True)
    document1 = models.ImageField(
        null=True, blank=True, upload_to=PathAndRename('images'))

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name
