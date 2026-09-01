from django.db import models

class HeroSlide(models.Model):
    image = models.ImageField(upload_to='hero_slides/', verbose_name="Slide Image")
    is_active = models.BooleanField(default=True, verbose_name="Is Active?")
    order = models.PositiveIntegerField(default=0, verbose_name="Display Order")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', '-created_at']
        verbose_name = "Hero Slide"
        verbose_name_plural = "Hero Slides"

    def __str__(self):
        return self.title