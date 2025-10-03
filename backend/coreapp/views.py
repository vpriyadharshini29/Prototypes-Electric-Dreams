from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from .models import Logo, NavItem, FooterSection, ContactInfo, Service
from .serializers import (
    LogoSerializer,
    NavItemSerializer,
    FooterSectionSerializer,
    ContactInfoSerializer,
    ServiceSerializer
)

# ----------------------------
# Navbar API
# ----------------------------
class NavbarAPIView(APIView):
    """
    Returns navbar JSON including logo and nav items (with dropdown support).
    """
    def get(self, request, format=None):
        logo = Logo.objects.first()
        # 🔹 Pass context={"request": request}
        logo_data = LogoSerializer(logo, context={"request": request}).data if logo else {}

        nav_items = NavItem.objects.filter(parent=None).order_by('order')
        nav_data = NavItemSerializer(nav_items, many=True, context={"request": request}).data

        return Response({
            'logo': logo_data,
            'nav_items': nav_data
        })



# ----------------------------
# Footer API
# ----------------------------
class FooterAPIView(APIView):
    """
    Returns footer JSON including logo, footer sections, and contact info.
    """
    def get(self, request, format=None):
        logo = Logo.objects.first()
        logo_data = LogoSerializer(logo).data if logo else {}

        sections = FooterSection.objects.all()
        sections_data = FooterSectionSerializer(sections, many=True).data

        contact = ContactInfo.objects.first()
        contact_data = ContactInfoSerializer(contact).data if contact else {}

        return Response({
            'logo': logo_data,
            'sections': sections_data,
            'contact': contact_data
        })

from rest_framework import generics
from .models import Service, Product
from .serializers import ServiceSerializer, ProductSerializer

class ServiceListByCategoryAPIView(generics.ListAPIView):
    serializer_class = ServiceSerializer

    def get_queryset(self):
        category_id = self.kwargs.get("category_id")
        return Service.objects.filter(category_id=category_id).order_by("order")


class ProductListByServiceAPIView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        service_id = self.kwargs.get("service_id")
        return Product.objects.filter(service_id=service_id).order_by("order")



from rest_framework import generics
from .models import HomeBanner, HomeService
from .serializers import HomeBannerSerializer, HomeServiceSerializer

class HomeBannerList(generics.ListAPIView):
    queryset = HomeBanner.objects.all()
    serializer_class = HomeBannerSerializer

class HomeServiceList(generics.ListAPIView):
    queryset = HomeService.objects.all()
    serializer_class = HomeServiceSerializer

from .models import HomeWhyChooseUs
from .serializers import HomeWhyChooseUsSerializer

class HomeWhyChooseUsView(APIView):
    def get(self, request):
        data = HomeWhyChooseUs.objects.last()  # Only one section
        serializer = HomeWhyChooseUsSerializer(data, context={'request': request})
        return Response(serializer.data)



from rest_framework import viewsets
from .models import Home1Step, Home1Testimonial, Home1Brand, Home1FAQ, Home1ContactInfo
from .serializers import (
    Home1StepSerializer, Home1TestimonialSerializer,
    Home1BrandSerializer, Home1FAQSerializer, Home1ContactInfoSerializer
)

class Home1StepViewSet(viewsets.ModelViewSet):
    queryset = Home1Step.objects.all().order_by("order")
    serializer_class = Home1StepSerializer

class Home1TestimonialViewSet(viewsets.ModelViewSet):
    queryset = Home1Testimonial.objects.all()
    serializer_class = Home1TestimonialSerializer

class Home1BrandViewSet(viewsets.ModelViewSet):
    queryset = Home1Brand.objects.all()
    serializer_class = Home1BrandSerializer

class Home1FAQViewSet(viewsets.ModelViewSet):
    queryset = Home1FAQ.objects.all()
    serializer_class = Home1FAQSerializer

class Home1ContactInfoViewSet(viewsets.ModelViewSet):
    queryset = Home1ContactInfo.objects.all()
    serializer_class = Home1ContactInfoSerializer



from rest_framework.views import APIView
from rest_framework.response import Response
from .models import EmergencyBanner, EmergencyService, EmergencyWhyChoose, EmergencyCallToAction, EmergencyFormContent
from .serializers import (
    EmergencyBannerSerializer,
    EmergencyServiceSerializer,
    EmergencyWhyChooseSerializer,
    EmergencyCallToActionSerializer,
    EmergencyFormContentSerializer
)

class EmergencyBannerAPI(APIView):
    def get(self, request):
        banners = EmergencyBanner.objects.all()
        serializer = EmergencyBannerSerializer(banners, many=True, context={'request': request})
        return Response(serializer.data)

class EmergencyServiceAPI(APIView):
    def get(self, request):
        services = EmergencyService.objects.all()
        serializer = EmergencyServiceSerializer(services, many=True, context={'request': request})
        return Response(serializer.data)

class EmergencyWhyChooseAPI(APIView):
    def get(self, request):
        items = EmergencyWhyChoose.objects.all()
        serializer = EmergencyWhyChooseSerializer(items, many=True, context={'request': request})
        return Response(serializer.data)

class EmergencyCallToActionAPI(APIView):
    def get(self, request):
        items = EmergencyCallToAction.objects.all()
        serializer = EmergencyCallToActionSerializer(items, many=True, context={'request': request})
        return Response(serializer.data)

class EmergencyFormContentAPI(APIView):
    def get(self, request):
        items = EmergencyFormContent.objects.all()
        serializer = EmergencyFormContentSerializer(items, many=True, context={'request': request})
        return Response(serializer.data)



from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import AboutCompanyInfo, AboutWhoWeAre, AboutService, AboutCommitment
from .serializers import AboutCompanyInfoSerializer, AboutWhoWeAreSerializer, AboutServiceSerializer, AboutCommitmentSerializer

@api_view(["GET"])
def get_company_info(request):
    data = AboutCompanyInfo.objects.first()
    return Response(AboutCompanyInfoSerializer(context={"request": request}).data)
@api_view(["GET"])
def get_who_we_are(request):
    data = AboutWhoWeAre.objects.first()
    serializer = AboutWhoWeAreSerializer(data, context={"request": request})
    return Response(serializer.data)

@api_view(["GET"])
def get_services(request):
    data = AboutService.objects.all()
    serializer = AboutServiceSerializer(data, many=True, context={"request": request})
    return Response(serializer.data)

@api_view(["GET"])
def get_commitment(request):
    data = AboutCommitment.objects.first()
    serializer = AboutCommitmentSerializer(data, context={"request": request})
    return Response(serializer.data)



from rest_framework.views import APIView
from rest_framework.response import Response
from .models import ContactPageInfo, ContactPageForm
from .serializers import ContactPageInfoSerializer, ContactPageFormSerializer

class ContactPageAPIView(APIView):
    def get(self, request):
        info = ContactPageInfo.objects.first()
        form = ContactPageForm.objects.first()
        return Response({
            "info": ContactPageInfoSerializer(info).data if info else {},
            "form": ContactPageFormSerializer(form).data if form else {}
        })

from rest_framework import viewsets
from .models import AreaSection
from .serializers import AreaSectionSerializer

class AreaSectionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = AreaSection.objects.all()
    serializer_class = AreaSectionSerializer
