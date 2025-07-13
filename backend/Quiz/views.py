import datetime
from django.shortcuts import render
from Quiz.Serializer import UserSerializer, QuestionSerializer
from Quiz.models import User , Question
from rest_framework.response import Response
from   rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view , permission_classes
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from Quiz.quiz_gen import generate_questions
import json

@permission_classes([AllowAny])
class Sign_up(APIView):
    def post(self,request):
        serializer= UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token = RefreshToken.for_user(user)
            return Response(
               [serializer.data , {
                   'jwt': str(token.access_token)
               }]
            ,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        
@permission_classes([AllowAny])
class Sign_in(APIView):
    def post(self,request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = User.objects.filter(email=email).first()
        if user is None:
            raise AuthenticationFailed('Email Not Found')
        if not user.check_password(password):
            raise AuthenticationFailed('Password Incorrect')
        token = RefreshToken.for_user(user)
        respons = Response()
        respons.data = {
             'name': user.username,
             'id' : user.id,
             'jwt': str(token.access_token)
        }
        return respons
    

@permission_classes([IsAuthenticated])
class GenerateQuestion(APIView):
    def post(self, request):
        topic = request.data.get('topic')
        
        if not topic:
            return Response(
                {"error": "Topic is required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        result = generate_questions(topic)

        if result:
            return Response(result, status=status.HTTP_201_CREATED)

        return Response(
            {"error": "Failed to generate questions."},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@permission_classes([IsAuthenticated])
class HistorySave(APIView):
     def post(self,request):
          serializer = QuestionSerializer(data=request.data , many=True)
          if serializer.is_valid():
               serializer.save()
               return Response({'message': 'Successfully added new entry to the history '},status=status.HTTP_201_CREATED)
          return Response({'message': 'Faild to add new entry to the history '},status=status.HTTP_400_BAD_REQUEST)
     
     def get(self, request):
          date_str = request.query_params.get('date')
          user_id = request.query_params.get('id')
          if not user_id:
               return Response({'message': 'User does not exist.'},status=status.HTTP_400_BAD_REQUEST)
          date_obj = datetime.datetime.strptime(date_str, "%Y-%m-%d").date()
          questions = Question.objects.filter(user_id = user_id , Created_At__date = date_obj)
          serializer = QuestionSerializer(questions, many=True)
          return Response(serializer.data,status=status.HTTP_200_OK)
