"""
API V1: Combo Views
"""
###
# Libs
###
from rest_framework import viewsets
from app.combo.api.v1.serializers.combo.create import CreateComboSerializer
from app.combo.api.v1.serializers.combo.default import DefaultComboSerializer
from app.combo.api.v1.serializers.combo.update import UpdateComboSerializer
from app.combo.models.combo import Combo


###
# Viewsets
###
class ComboViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            return user.combo_set.all().order_by('id')
        else:
            return Combo.objects.none()

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(user=user)

    def get_serializer_class(self):
        if self.action == 'create':
            return CreateComboSerializer
        elif self.action in ['update', 'partial_update']:
            return UpdateComboSerializer
        else:
            return DefaultComboSerializer
