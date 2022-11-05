
from django.http import JsonResponse
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User
from .serializers import ProductSerializer
from base.models import Product,Order,Order_det
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from django.contrib.auth import logout



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        token['adminn'] = user.is_superuser
        # ...

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh',
    ]

    return Response(routes)

# register/signup
@api_view(['POST'])
def register(request):
    User.objects.create_user(username= request.data["username"],email=request.data["email"],password=request.data["password"])
    print( request.data["username"])
    print( request.data["email"])
    print(request.data["password"])
    return Response("registered")
# logout
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def myLogout(request):
    logout(request)
    return Response("logged out")

# @api_view(['GET'])
# def getCategories(request):
#     categories= Category.objects.all()
#     serializer = CategorySerializer(categories,many=True)
#     return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getProducts(request):
    
            res=[] #create an empty list
            for productObj in Product.objects.all(): #run on every row in the table...
                res.append({"id": productObj._id,
                    "desc":productObj.desc,
                "price":productObj.price,
                "category":productObj.category,
                "image":str( productObj.prod_image),
                }) #append row by to row to res list
            return JsonResponse(res,safe=False)


class APIViews(APIView):
    parser_class=(MultiPartParser,FormParser)
    def post(self,request,*args,**kwargs):
        api_serializer=ProductSerializer(data=request.data)
        if api_serializer.is_valid():
            api_serializer.save()
            return Response(api_serializer.data,status=status.HTTP_201_CREATED)
        else:
            print('error',api_serializer.errors)
            return Response(api_serializer.errors,status=status.HTTP_400_BAD_REQUEST)





@api_view(['POST'])
@permission_classes([IsAdminUser])
def addProduct(request):
    Product.objects.create(desc = request.data["desc"],price = request.data["price"],category= request.data["category"])
    return Response({"added": "new product"})
    

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updProduct(request,id):
    temp=Product.objects.get(_id =id)
    temp.desc=request.data['desc']
    temp.price =request.data['price']
    temp.category= request.data['category']
    temp.save()
    return JsonResponse({'item': 'has been updated'})

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delProduct(request,id):
    temp= Product.objects.get(_id = id)
    temp.delete()
    return JsonResponse({'item': 'has been deleted '})


@api_view(['POST','GET'])
@permission_classes([IsAuthenticated])
def addOrder(request):
    orders=request.data
    # create a single oreder
    newOrder= Order.objects.create(user_id=request.user,total=1)

    # create new order details
    for x in orders:
        newProd=Product.objects.get(_id= x["_id"])
        total=newProd.price * x["amount"]
        Order_det.objects.create(order_id=newOrder,prod_id=newProd,amount=x["amount"],total=total)

    # print(newOrder)
    # Order_det.objects.create(order_id=newOrder,)
    return Response("product was create successfully")


    # def getCategories(request):
    # categories = Category.objects.all()
    # serializer = CategorySerializer(categories, many=True)
    # return Response(serializer.data)

# @api_view(['GET'])
# def getCategories(request):
#     categories= Category.objects.all()
#     serializer = CategorySerializer(categories,many=True)
#     return Response(serializer.data)

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def addCategory(request):
#     serializer = CategorySerializer(data=request.data)

#     if( serializer.is_valid()):
#         serializer.save()#user_id=request.user.id)
#     else:
#         return Response("data was not saved, error ....")

#     return Response("category was create successfully")


# function that gets a category name and returns the items the
# same category name^^
# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def getCategories(request,data):
#     temp=Product.object.get(category=data)









