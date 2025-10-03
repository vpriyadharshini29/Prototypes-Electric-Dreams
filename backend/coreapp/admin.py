from django.contrib import admin
from .models import Logo, NavItem, FooterSection, FooterLink, ContactInfo

@admin.register(Logo)
class LogoAdmin(admin.ModelAdmin):
    list_display = ('alt_text', 'image')


@admin.register(NavItem)
class NavItemAdmin(admin.ModelAdmin):
    list_display = ('title', 'url', 'order', 'parent')
    list_filter = ('parent',)
    ordering = ('order',)
    search_fields = ('title', 'url')


class FooterLinkInline(admin.TabularInline):
    model = FooterLink
    extra = 1


@admin.register(FooterSection)
class FooterSectionAdmin(admin.ModelAdmin):
    list_display = ('title', 'order')
    inlines = [FooterLinkInline]


@admin.register(ContactInfo)
class ContactInfoAdmin(admin.ModelAdmin):
    list_display = ('location', 'phone', 'email')


from django.contrib import admin
from .models import ServiceCategory, Service, Product

class ServiceCategoryAdmin(admin.ModelAdmin):
    list_display = ("title",)
    search_fields = ("title",)


class ServiceAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "order")
    list_filter = ("category",)
    search_fields = ("title", "description")
    ordering = ("order",)


class ProductAdmin(admin.ModelAdmin):
    list_display = ("title", "service", "price", "order")
    list_filter = ("service",)
    search_fields = ("title", "description")
    ordering = ("order",)


admin.site.register(ServiceCategory, ServiceCategoryAdmin)
admin.site.register(Service, ServiceAdmin)
admin.site.register(Product, ProductAdmin)


from django.contrib import admin
from .models import HomeBanner, HomeService

@admin.register(HomeBanner)
class HomeBannerAdmin(admin.ModelAdmin):
    list_display = ("title",)

@admin.register(HomeService)
class HomeServiceAdmin(admin.ModelAdmin):
    list_display = ("title",)

from django.contrib import admin
from .models import HomeWhyChooseUs

@admin.register(HomeWhyChooseUs)
class HomeWhyChooseUsAdmin(admin.ModelAdmin):
    list_display = ('heading', 'created_at')



from django.contrib import admin
from .models import Home1Step, Home1Testimonial, Home1Brand, Home1FAQ, Home1ContactInfo

admin.site.register(Home1Step)
admin.site.register(Home1Testimonial)
admin.site.register(Home1Brand)
admin.site.register(Home1FAQ)
admin.site.register(Home1ContactInfo)

from django.contrib import admin
from .models import EmergencyBanner, EmergencyService, EmergencyWhyChoose, EmergencyCallToAction, EmergencyFormContent

admin.site.register(EmergencyBanner)
admin.site.register(EmergencyService)
admin.site.register(EmergencyWhyChoose)
admin.site.register(EmergencyCallToAction)
admin.site.register(EmergencyFormContent)


from django.contrib import admin
from .models import AboutImage, AboutCompanyInfo, AboutWhoWeAre, AboutService, AboutCommitment

admin.site.register(AboutImage)
admin.site.register(AboutCompanyInfo)
admin.site.register(AboutWhoWeAre)
admin.site.register(AboutService)
admin.site.register(AboutCommitment)
from django.contrib import admin
from django.utils.html import format_html
from .models import ContactPageInfo, ContactPageForm

@admin.register(ContactPageInfo)
class ContactPageInfoAdmin(admin.ModelAdmin):
    list_display = ('title', 'phone_number', 'email_address', 'map_preview')
    search_fields = ('title', 'phone_number', 'email_address')

    def map_preview(self, obj):
        if obj.map_image:
            return format_html('<img src="{}" style="width: 150px; height: auto;" />', obj.map_image.url)
        return "-"
    map_preview.short_description = "Map Image Preview"


@admin.register(ContactPageForm)
class ContactPageFormAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'button_text')




from django.contrib import admin
from .models import AreaSection, AreaItem

class AreaItemInline(admin.TabularInline):
    model = AreaItem
    extra = 1

@admin.register(AreaSection)
class AreaSectionAdmin(admin.ModelAdmin):
    inlines = [AreaItemInline]
