from rest_framework import serializers
from .models import User,Question
import json
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    class Meta:
         model = User
         fields = ['id','email','password','username']
         extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)  
        user.save()
        return user
    
class QuestionSerializer(serializers.ModelSerializer):
    options = serializers.ListField(child=serializers.CharField())
    class Meta:
        model = Question
        fields = ['user_id','title','options','correct_answer_id','explanation','user_answer']

      
    def to_representation(self, instance):
       ret = super().to_representation(instance)
       options_str = instance.options
       try:
         ret['options'] = json.loads(options_str) if options_str else []
       except json.JSONDecodeError:
          ret['options'] = []   
       return ret
 
    def to_internal_value(self, data):
       internal = super().to_internal_value(data)
       options = internal.get('options', [])
       if not isinstance(options, str):
        internal['options'] = json.dumps(options)
       return internal

    