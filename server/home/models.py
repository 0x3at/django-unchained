from django.contrib.sessions.models import AbstractBaseSession
from django.db import models

class CustomSession(AbstractBaseSession):
    first_time = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Custom Session"
        verbose_name_plural = "Custom Sessions"