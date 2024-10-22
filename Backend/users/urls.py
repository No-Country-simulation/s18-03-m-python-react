from .views import CountryListCreateView, CountryDetailView, ProvinceListCreateView, ProvinceDetailView, CityListCreateView, CityDetailView, BankListCreateView, BankDetailView, BankAccountTypeListCreateView, BankAccountTypeDetailView, PersonViewSet, ProfilePictureView, ActiveEmployeeView, EntitiesAmountView
from django.urls import path


employee_list = PersonViewSet.as_view({
    'get': 'list',       
    'post': 'create'      
})

employee_detail = PersonViewSet.as_view({
    'get': 'retrieve',    
    'put': 'update',
    'patch': 'partial_update',  
    'delete': 'destroy'   
})

urlpatterns = [
    path("country/", CountryListCreateView.as_view(), name="country-list-create"),
    path("country/<int:pk>", CountryDetailView.as_view(), name="country-detail"),
    
    path("province/", ProvinceListCreateView.as_view(), name="province-list-create"),
    path("province/<int:pk>", ProvinceDetailView.as_view(), name="province-detail"),
     
    path("city/", CityListCreateView.as_view(), name="city-list-create"),
    path("city/<int:pk>", CityDetailView.as_view(), name="city-detail"),
     
    path("bank/", BankListCreateView.as_view(), name="bank-list-create"),
    path("bank/<int:pk>", BankDetailView.as_view(), name="bank-detail"),
     
    path("bankaccounttype/", BankAccountTypeListCreateView.as_view(), name="bankaccounttype-list-create"),
    path("bankaccounttype/<int:pk>", BankAccountTypeDetailView.as_view(), name="bankaccounttype-detail"),
    
    path("employee/", employee_list, name="employee-list-create"),
    path("employee/<int:pk>", employee_detail, name="employee-detail"),
    
    path("profilepicture/<int:pk>/", ProfilePictureView.as_view(), name="profilepicture"),
    
    path("activeemployee/<int:pk>/", ActiveEmployeeView.as_view(), name="active-employee"),
    
    path("entitiesamount/", EntitiesAmountView.as_view(), name="entities-amount"),
]
