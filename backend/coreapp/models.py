from django.db import models

class Logo(models.Model):
    image = models.ImageField(upload_to='logos/', help_text='Upload logo image')
    alt_text = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.alt_text or (self.image.name if self.image else "No Logo")


class NavItem(models.Model):
    title = models.CharField(max_length=100)
    url = models.CharField(max_length=255, help_text='URL or route')
    order = models.PositiveIntegerField(default=0)
    parent = models.ForeignKey(
        'self',
        null=True,
        blank=True,
        related_name='children',
        on_delete=models.CASCADE
    )

    def __str__(self):
        return f'{self.order} - {self.title}'

    class Meta:
        ordering = ['order']


class FooterSection(models.Model):
    title = models.CharField(max_length=100)
    order = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['order']


class FooterLink(models.Model):
    section = models.ForeignKey(FooterSection, related_name='links', on_delete=models.CASCADE)
    title = models.CharField(max_length=150)
    url = models.CharField(max_length=255, blank=True)
    order = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f'{self.section.title} - {self.title}'

    class Meta:
        ordering = ['order']


class ContactInfo(models.Model):
    location = models.CharField(max_length=255, blank=True)
    phone = models.CharField(max_length=50, blank=True)
    email = models.EmailField(blank=True)

    def __str__(self):
        return f'Contact ({self.email or self.phone or "N/A"})'



from django.db import models

class ServiceCategory(models.Model):
    title = models.CharField(max_length=200)

    def __str__(self):
        return self.title


class Service(models.Model):
    category = models.ForeignKey(ServiceCategory, on_delete=models.CASCADE, related_name="services")
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to="services/")
    order = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.title


class Product(models.Model):
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name="products")
    title = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to="products/")
    order = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.title} ({self.service.title})"


from django.db import models

# Top Banner Section
class HomeBanner(models.Model):
    title = models.CharField(max_length=255)
    subtitle = models.TextField()
    background_image = models.ImageField(upload_to="banners/")

    def __str__(self):
        return self.title


# Service Cards
class HomeService(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    image = models.ImageField(upload_to="services/")

    def __str__(self):
        return self.title

from django.db import models

class HomeWhyChooseUs(models.Model):
    # Image on the left side
    image = models.ImageField(upload_to='home/')
    
    # Heading and description
    heading = models.CharField(max_length=200, default="Why choose us?")
    description = models.TextField(blank=True)
    
    # Stat cards
    stat1_title = models.CharField(max_length=100, default="Years of Industry Experience")
    stat1_value = models.CharField(max_length=50, default="50+")
    stat1_desc = models.TextField(default="Combining decades of expertise to provide reliable, effective electrical solutions.")

    stat2_title = models.CharField(max_length=100, default="Projects Completed")
    stat2_value = models.CharField(max_length=50, default="5000+")
    stat2_desc = models.TextField(default="Reflecting the trust businesses and home owners place in us for ongoing electrical services.")

    stat3_title = models.CharField(max_length=100, default="First-Time Fix Rate")
    stat3_value = models.CharField(max_length=50, default="98%")
    stat3_desc = models.TextField(default="Proving our efficiency in diagnosing and resolving electrical issues on the first visit.")

    stat4_title = models.CharField(max_length=100, default="Client Energy Savings")
    stat4_value = models.CharField(max_length=50, default="10M")
    stat4_desc = models.TextField(default="Estimating the financial impact our solutions have had in reducing energy costs.")

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "Home Why Choose Us Section"



from django.db import models

# Step Section
class Home1Step(models.Model):
    title = models.CharField(max_length=200, default="Step Title")
    description = models.TextField(default="Step description here...")
    order = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.order}. {self.title}"


# Testimonials
class Home1Testimonial(models.Model):
    name = models.CharField(max_length=200, default="Customer Name")
    role = models.CharField(max_length=200, default="Service Type")
    feedback = models.TextField(default="Customer feedback goes here...")
    stars = models.PositiveIntegerField(default=5)

    def __str__(self):
        return f"{self.name} - {self.role}"


# Brands
class Home1Brand(models.Model):
    name = models.CharField(max_length=200, default="Brand Name")
    logo = models.ImageField(upload_to="home1/brands/")
    website = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.name


# FAQ
class Home1FAQ(models.Model):
    question = models.CharField(max_length=255, default="FAQ Question?")
    answer = models.TextField(default="Default FAQ answer goes here.")

    def __str__(self):
        return self.question


# Contact Info
class Home1ContactInfo(models.Model):
    heading = models.CharField(max_length=200, default="Get in Touch with Electric Dreams Electrical Today")
    phone = models.CharField(max_length=20, default="+91 1234567890")
    button_text = models.CharField(max_length=100, default="Call Us Today")

    def __str__(self):
        return self.phone


from django.db import models

class EmergencyBanner(models.Model):
    title = models.CharField(max_length=255, default="Professional Emergency Electrician - Fast & Reliable")
    subtitle = models.TextField(default="24-hour Electrician in Electric town. Call Our Professional Electricians Now to Get Help Fast")
    button_text = models.CharField(max_length=50, default="Get Emergency Service")
    image = models.ImageField(upload_to='emergency/banners/')

    def __str__(self):
        return self.title

class EmergencyService(models.Model):
    icon = models.ImageField(upload_to='emergency/icons/')
    title = models.CharField(max_length=100, default="Lifetime Warranty")
    description = models.TextField(default="We provide high-quality services with lifetime warranty.")

    def __str__(self):
        return self.title

class EmergencyWhyChoose(models.Model):
    title = models.CharField(max_length=255, default="Quality Workmanship")
    description = models.TextField(default="Our electricians are trained and experienced to handle all emergencies efficiently.")
    image = models.ImageField(upload_to='emergency/why_choose/')

    def __str__(self):
        return self.title

class EmergencyCallToAction(models.Model):
    title = models.CharField(max_length=255, default="Get in Touch with Electric Dreams Electrical Today")
    phone = models.CharField(max_length=20, default="+1234567890")
    button_text = models.CharField(max_length=50, default="Call Now")

    def __str__(self):
        return self.title

class EmergencyFormContent(models.Model):
    heading = models.CharField(max_length=255, default="Request a call back")
    description = models.TextField(default="Fill in your details below and we will get back to you within 30 minutes or less")
    name_placeholder = models.CharField(max_length=50, default="Name")
    mobile_placeholder = models.CharField(max_length=50, default="Mobile")
    email_placeholder = models.CharField(max_length=50, default="Email address")
    service_placeholder = models.CharField(max_length=50, default="Service")
    submit_text = models.CharField(max_length=50, default="Send Message")

    def __str__(self):
        return self.heading



from django.db import models

# Reusable image model
class AboutImage(models.Model):
    name = models.CharField(max_length=100, unique=True)
    image = models.ImageField(upload_to="uploads/")

    def __str__(self):
        return self.name


class AboutCompanyInfo(models.Model):
    name = models.CharField(max_length=200, default="Electric Dreams")
    description = models.TextField(default="We are here to provide tailored solutions that meet your unique electrical needs.")
    contact_number = models.CharField(max_length=20, default="+911234567890")

    def __str__(self):
        return f"Company Info - {self.name}"


class AboutWhoWeAre(models.Model):
    title = models.CharField(max_length=200, default="Who we are ?")
    description = models.TextField(default="Electric Dreams Group was founded with a passion for powering the community responsibly...")
    license_info = models.TextField(default="Electrical Contractors License: 12356\nSolar Accreditation: 5762397")
    image = models.ForeignKey(AboutImage, on_delete=models.SET_NULL, null=True, blank=True, related_name="about_who_we_are_image")

    def __str__(self):
        return f"Who We Are - {self.title}"


class AboutService(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ForeignKey(AboutImage, on_delete=models.SET_NULL, null=True, blank=True, related_name="about_service_image")

    def __str__(self):
        return f"Service - {self.name}"


class AboutCommitment(models.Model):
    title = models.CharField(max_length=200, default="Our Commitment to You")
    description = models.TextField(default="At Electric Dreams Solutions Group, client satisfaction isn’t just a goal...")
    image = models.ForeignKey(AboutImage, on_delete=models.SET_NULL, null=True, blank=True, related_name="about_commitment_image")

    def __str__(self):
        return f"Commitment - {self.title}"

from django.db import models

class ContactPageInfo(models.Model):
    title = models.CharField(max_length=200, default="Contact Us")
    subtitle = models.CharField(max_length=300, default="We’d love to hear from you.")
    phone_label = models.CharField(max_length=100, default="Call our Team")
    phone_number = models.CharField(max_length=50, default="+91-1234567890")
    email_label = models.CharField(max_length=100, default="Reach out to us")
    email_address = models.EmailField(default="support@electricdreams.com")
    map_image = models.ImageField(upload_to="contactpage/", blank=True, null=True)

    def __str__(self):
        return self.title


class ContactPageForm(models.Model):
    first_name = models.CharField(max_length=100, blank=True, default="First Name")
    last_name = models.CharField(max_length=100, blank=True, default="Last Name")
    phone_placeholder = models.CharField(max_length=100, default="Phone number")
    email_placeholder = models.CharField(max_length=100, default="Email address")
    address_placeholder = models.CharField(max_length=200, default="Address (Optional)")
    message_placeholder = models.CharField(max_length=200, default="Type your message...")
    button_text = models.CharField(max_length=100, default="Send Message")

    def __str__(self):
        return "Contact Page Form Placeholders"


from django.db import models

class AreaSection(models.Model):
    # Main section content
    area_title = models.CharField(max_length=200, default="Areas we services")
    area_subtitle = models.TextField(
        default="Below are some areas we provide electrical services to. But, don’t worry if your area is not listed, we likely service your area too!"
    )
    area_cta_text = models.CharField(max_length=200, default="Get in Touch with Electric Dreams Electrical Today")
    area_cta_button_text = models.CharField(max_length=50, default="Call(+91)1234567890")
    area_cta_button_link = models.CharField(max_length=100, default="tel:+911234567890")
    area_image = models.ImageField(upload_to="areas/", blank=True, null=True)

    def __str__(self):
        return "Area Section"

class AreaItem(models.Model):
    # Individual area items
    name = models.CharField(max_length=100)
    section = models.ForeignKey(AreaSection, related_name="areas", on_delete=models.CASCADE)

    def __str__(self):
        return self.name
