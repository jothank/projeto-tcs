"""
API V1: Combo Views
"""
###
# Libraries
###
from rest_framework import viewsets
from app.combo.api.v1.serializers.combo.create import CreateComboSerializer
from app.combo.api.v1.serializers.combo.default import DefaultComboSerializer
from app.combo.models.combo import Combo


###
# Viewsets
###
class ComboViewSet(viewsets.ModelViewSet):
    queryset = Combo.objects.all()

    def get_serializer_class(self):
        if self.action == 'create':
            return CreateComboSerializer
        else:
            return DefaultComboSerializer
