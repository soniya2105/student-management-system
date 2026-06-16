from django.urls import path
from .views import student_list,delete_student,update_student
urlpatterns = [
    path('students/', student_list),
    path('students/<int:id>/', delete_student),
    path('students/update/<int:id>/', update_student),
]