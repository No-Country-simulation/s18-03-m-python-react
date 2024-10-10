from .views import DepartmentListCreateView, DepartmentDetailView, RoleListCreateView, RoleDetailView, TeamListCreateView, TeamDetailView
from django.urls import path

urlpatterns = [
    path("department/", DepartmentListCreateView.as_view(), name="department-list-create"),
    path("department/<int:pk>", DepartmentDetailView.as_view(), name="department-detail"),
    
    path("role/", RoleListCreateView.as_view(), name="role-list-create"),
    path("role/<int:pk>", RoleDetailView.as_view(), name="role-detail"),
    
    path("team/", TeamListCreateView.as_view(), name="team-list-create"),
    path("team/<int:pk>", TeamDetailView.as_view(), name="team-detail"),
]