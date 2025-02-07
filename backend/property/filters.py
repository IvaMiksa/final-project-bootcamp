import django_filters
from django.db.models import Q

from .models import Property


class PropertyFilter(django_filters.FilterSet):
    available_dates_start = django_filters.DateFilter(field_name='bookings__start_date', lookup_expr='gte')
    available_dates_end = django_filters.DateFilter(field_name='bookings__end_date', lookup_expr='lte')

    class Meta:
        model = Property
        fields = ['country', 'available_dates_start', 'available_dates_end', 'price']

    def filter_queryset(self, queryset):
        start_date = self.data.get('available_dates_start')
        end_date = self.data.get('available_dates_end')
        country = self.data.get('country')
        ordering = self.data.get('ordering')

        if country:
            queryset = queryset.filter(Q(country__icontains=country))

        if start_date and end_date:
            queryset = queryset.exclude(
                Q(bookings__start_date__lt=end_date) & Q(bookings__end_date__gt=start_date)
            )

        valid_filter_fields = ["rating", "price"]

        if ordering:
            ordering_fields = ordering.split(',')
            for field in ordering_fields:
                if field.lstrip('-') in valid_filter_fields:
                    queryset = queryset.order_by(*ordering.split(','))

        return queryset
