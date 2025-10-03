from rest_framework import serializers
from .models import Logo, NavItem, FooterSection, FooterLink, ContactInfo

# --- Logo ---
class LogoSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Logo
        fields = ['image', 'alt_text']

    def get_image(self, obj):
        request = self.context.get("request")
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None

# --- FooterLink ---
class FooterLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = FooterLink
        fields = ['title', 'url', 'order']

# --- FooterSection with nested links ---
class FooterSectionSerializer(serializers.ModelSerializer):
    links = FooterLinkSerializer(many=True, read_only=True)

    class Meta:
        model = FooterSection
        fields = ['title', 'order', 'links']

# --- ContactInfo ---
class ContactInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactInfo
        fields = ['location', 'phone', 'email']

# --- NavItem with children for dropdowns ---
class NavItemSerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField()

    class Meta:
        model = NavItem
        fields = ['title', 'url', 'order', 'children']

    def get_children(self, obj):
        children_qs = obj.children.all().order_by('order')
        return NavItemSerializer(children_qs, many=True).data



from rest_framework import serializers
from .models import Service, ServiceCategory, Product

class ProductSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ["id", "title", "description", "price", "image_url", "order"]

    def get_image_url(self, obj):
        request = self.context.get("request")
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return ""


class ServiceSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Service
        fields = ["id", "title", "description", "image_url", "order"]

    def get_image_url(self, obj):
        request = self.context.get("request")
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return ""



# core/serializers.py
from rest_framework import serializers
from .models import HomeBanner, HomeService

class HomeBannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomeBanner
        fields = "__all__"

class HomeServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomeService
        fields = "__all__"

from rest_framework import serializers
from .models import HomeWhyChooseUs

class HomeWhyChooseUsSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = HomeWhyChooseUs
        fields = '__all__'

    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image:
            return request.build_absolute_uri(obj.image.url)
        return None

from rest_framework import serializers
from .models import Home1Step, Home1Testimonial, Home1Brand, Home1FAQ, Home1ContactInfo

class Home1StepSerializer(serializers.ModelSerializer):
    class Meta:
        model = Home1Step
        fields = "__all__"

class Home1TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Home1Testimonial
        fields = "__all__"

class Home1BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Home1Brand
        fields = "__all__"

class Home1FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = Home1FAQ
        fields = "__all__"

class Home1ContactInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Home1ContactInfo
        fields = "__all__"


from rest_framework import serializers
from .models import EmergencyBanner, EmergencyService, EmergencyWhyChoose, EmergencyCallToAction, EmergencyFormContent

class EmergencyBannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmergencyBanner
        fields = '__all__'

class EmergencyServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmergencyService
        fields = '__all__'

class EmergencyWhyChooseSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmergencyWhyChoose
        fields = '__all__'

class EmergencyCallToActionSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmergencyCallToAction
        fields = '__all__'

class EmergencyFormContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmergencyFormContent
        fields = '__all__'


from rest_framework import serializers
from .models import AboutImage, AboutCompanyInfo, AboutWhoWeAre, AboutService, AboutCommitment

class AboutImageSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = AboutImage
        fields = "__all__"

    def get_image(self, obj):
        request = self.context.get("request")
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None


class AboutCompanyInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutCompanyInfo
        fields = "__all__"

class AboutWhoWeAreSerializer(serializers.ModelSerializer):
    image = AboutImageSerializer()
    class Meta:
        model = AboutWhoWeAre
        fields = "__all__"

class AboutServiceSerializer(serializers.ModelSerializer):
    image = AboutImageSerializer()
    class Meta:
        model = AboutService
        fields = "__all__"

class AboutCommitmentSerializer(serializers.ModelSerializer):
    image = AboutImageSerializer()
    class Meta:
        model = AboutCommitment
        fields = "__all__"


from rest_framework import serializers
from .models import ContactPageInfo, ContactPageForm

class ContactPageInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactPageInfo
        fields = "__all__"

class ContactPageFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactPageForm
        fields = "__all__"



from rest_framework import serializers
from .models import AreaSection, AreaItem

class AreaItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = AreaItem
        fields = ["id", "name"]

class AreaSectionSerializer(serializers.ModelSerializer):
    areas = AreaItemSerializer(many=True, read_only=True)

    class Meta:
        model = AreaSection
        fields = [
            "id",
            "area_title",
            "area_subtitle",
            "area_cta_text",
            "area_cta_button_text",
            "area_cta_button_link",
            "area_image",
            "areas",
        ]
