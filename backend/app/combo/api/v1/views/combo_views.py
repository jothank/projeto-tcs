"""
API V1: Combo Views
"""
###
# Libs
###
from rest_framework import viewsets
from app.combo.api.v1.serializers.combo.create import CreateComboSerializer
from app.combo.api.v1.serializers.combo.default import DefaultComboSerializer
from app.combo.models.combo import Combo
from app.combo.models.combo_product import ComboProduct


###
# Viewsets
###
class ComboViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            return user.combo_set.all()
        else:
            return Combo.objects.none()

    def perform_create(self, serializer):
        user = self.request.user
        products = serializer.validated_data.pop('products')
        combo = serializer.save(user=user)
        for product in products:
            ComboProduct.objects.create(
                combo=combo, product=product, user=user)

    def get_serializer_class(self):
        if self.action == 'create':
            return CreateComboSerializer
        else:
            return DefaultComboSerializer
