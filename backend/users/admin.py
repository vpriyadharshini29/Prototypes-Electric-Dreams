from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    # Add phone_number to the admin form
    fieldsets = UserAdmin.fieldsets + (
        ("Extra Info", {"fields": ("phone_number",)}),
    )

    add_fieldsets = UserAdmin.add_fieldsets + (
        ("Extra Info", {"fields": ("phone_number",)}),
    )

    list_display = ("username", "email", "phone_number", "is_staff", "is_active")
    search_fields = ("username", "email", "phone_number")
    ordering = ("username",)

admin.site.register(CustomUser, CustomUserAdmin)
