from .views import DepartmentListCreateView, DepartmentDetailView, RoleListCreateView, RoleDetailView, TeamListCreateView, TeamDetailView
from django.urls import path

urlpatterns = [
    path("departments/", DepartmentListCreateView.as_view(), name="department-list-create"),
    path("departments/<int:pk>", DepartmentDetailView.as_view(), name="department-detail"),
    
    path("roles/", RoleListCreateView.as_view(), name="role-list-create"),
    path("roles/<int:pk>", RoleDetailView.as_view(), name="role-detail"),
    
    path("teams/", TeamListCreateView.as_view(), name="team-list-create"),
    path("teams/<int:pk>", TeamDetailView.as_view(), name="team-detail"),
]