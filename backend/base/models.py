from django.db import models
from django.contrib.auth.models import User

# Create your models here.




class Product(models.Model):
    prod_image=models.ImageField(upload_to='Posted_Images',null=True)
    _id=models.AutoField(primary_key=True,editable=False)
    category=models.CharField(max_length=50,null=True,blank=True)
    desc = models.CharField(max_length=50,null=True,blank=True)
    price= models.IntegerField()

    def  __str__(self):
        return self.desc



class Order(models.Model):
    _id=models.AutoField(primary_key=True,editable=False)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    createdTime=models.DateTimeField(auto_now_add=True)
    total = models.IntegerField()

class Order_det(models.Model):
    _id=models.AutoField(primary_key=True,editable=False)
    order_id =models.ForeignKey(Order, on_delete=models.CASCADE, null=True)
    prod_id =models.ForeignKey(Product,on_delete=models.SET_NULL,null=True)
    amount= models.IntegerField()
    total = models.IntegerField()
    




