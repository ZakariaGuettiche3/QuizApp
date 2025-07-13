from django.db import models
from django.contrib.auth.models import AbstractUser
import json

class User(AbstractUser):
     id = models.AutoField(primary_key=True)
     email = models.EmailField(unique=True)
     password = models.CharField(max_length=255)
     username = models.CharField(max_length=255)
     Created_At = models.DateTimeField(auto_now_add=True)
     USERNAME_FIELD = 'email'
     REQUIRED_FIELDS = ['username']
     class Meta: 
          db_table = 'Users'
     def __str__(self):
          return self.email
     
class Question(models.Model):
     id = models.AutoField(primary_key=True)
     user_id = models.ForeignKey(User,on_delete=models.CASCADE,related_name='history')
     Created_At = models.DateTimeField(auto_now_add=True)
     title = models.CharField(max_length=255)
     options = models.TextField()
     correct_answer_id = models.IntegerField()
     explanation = models.CharField(max_length=255)
     user_answer = models.IntegerField()
     def set_options(self, options_list):
        self.options = json.dumps(options_list)

     def get_options(self):
        return json.loads(self.options)



