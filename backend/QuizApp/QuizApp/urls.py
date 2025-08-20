"""
URL configuration for QuizApp project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from Quiz import views
from django.http import HttpResponse
def home(request):
    return HttpResponse("Welcome to QuizApp!")


urlpatterns = [
    path('', home, name='home'),
    path('admin/', admin.site.urls),
    path('api/Sign_in',views.Sign_in.as_view()),
    path('api/Sign_up',views.Sign_up.as_view()),
    path('api/GenerateQuestion',views.GenerateQuestion.as_view()),
    path('api/history',views.HistorySave.as_view())
]
