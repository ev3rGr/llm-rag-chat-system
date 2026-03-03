from django.db import models

# Create your models here.
class LLMModel(models.Model):

    model_name = models.CharField(max_length=50)
    
    def __str__(self):
        return self.model_name