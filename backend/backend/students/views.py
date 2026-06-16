from django.shortcuts import render

# Create your views here.
from rest_framework.response import Response
from rest_framework.decorators import api_view 
from .models import Student
from .serializers import StudentSerializer
@api_view(['GET','POST'])
def student_list(request):
   if request.method == 'GET':
      students=Student.objects.all()
      serializer=StudentSerializer(students,many=True)
      return Response(serializer.data)
   elif request.method=='POST':
      serializer=StudentSerializer(data=request.data)
      if serializer.is_valid():
         serializer.save()
         return Response(serializer.data,status=201)
      return Response(serializer.errors,status=400)
@api_view(['DELETE'])
def delete_student(request, id):
    try:
        student = Student.objects.get(id=id)
    except Student.DoesNotExist:
        return Response({"error":"student not found"},
                         status=404)

    student.delete()
    return Response({"message":"student deleted succesfully"},
       status=200)

@api_view(['PUT'])
def update_student(request, id):
    try:
        student = Student.objects.get(id=id)
    except Student.DoesNotExist:
        return Response({"error":"student not found"},
                         status=404)

    serializer = StudentSerializer(student, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    print(serializer.errors)
    print(request.data)
    return Response(serializer.errors, status=400)