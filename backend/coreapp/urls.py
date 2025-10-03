from django.urls import path, include
from rest_framework import routers
from . import views
from .views import (
    Home1StepViewSet,
    Home1TestimonialViewSet,
    Home1BrandViewSet,
    Home1FAQViewSet,
    Home1ContactInfoViewSet,
    NavbarAPIView,
    FooterAPIView,
    HomeBannerList,
    HomeServiceList,
    HomeWhyChooseUsView,
    ServiceListByCategoryAPIView,
    ProductListByServiceAPIView,
    EmergencyBannerAPI,
    EmergencyServiceAPI,
    EmergencyWhyChooseAPI,
    EmergencyCallToActionAPI,
    EmergencyFormContentAPI,
    ContactPageAPIView,
    AreaSectionViewSet
)

# DRF router setup for viewsets
router = routers.DefaultRouter()
router.register(r"home1-steps", Home1StepViewSet)
router.register(r"home1-testimonials", Home1TestimonialViewSet)
router.register(r"home1-brands", Home1BrandViewSet)
router.register(r"home1-faqs", Home1FAQViewSet)
router.register(r"home1-contact", Home1ContactInfoViewSet)
router.register(r'areasection', AreaSectionViewSet, basename='areasection')

urlpatterns = [
    # Router URLs for viewsets
    path("", include(router.urls)),

    # Individual APIViews
    path('navbar/', NavbarAPIView.as_view(), name='navbar-api'),
    path('footer/', FooterAPIView.as_view(), name='footer-api'),
    path("services/<int:category_id>/", ServiceListByCategoryAPIView.as_view(), name="services-by-category"),
    path("products/<int:service_id>/", ProductListByServiceAPIView.as_view(), name="products-by-service"),
    path("banners/", HomeBannerList.as_view(), name="home-banners"),
    path("services/", HomeServiceList.as_view(), name="home-services"),
    path('home-why-choose-us/', HomeWhyChooseUsView.as_view(), name='home-why-choose-us'),
    path('emer-banners/', EmergencyBannerAPI.as_view(), name='emergency-banners'),
    path('emer-services/', EmergencyServiceAPI.as_view(), name='emergency-services'),
    path('emer-why-choose/', EmergencyWhyChooseAPI.as_view(), name='emergency-why-choose'),
    path('emer-call-to-action/', EmergencyCallToActionAPI.as_view(), name='emergency-cta'),
    path('emer-form-content/', EmergencyFormContentAPI.as_view(), name='emergency-form'),
    path("about/company-info/", views.get_company_info),
    path("about/who-we-are/", views.get_who_we_are),
    path("about/services/", views.get_services),
    path("about/commitment/", views.get_commitment),
    path("contactpage/", ContactPageAPIView.as_view(), name="contactpage"),
]
