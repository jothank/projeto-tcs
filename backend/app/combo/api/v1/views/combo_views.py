"""
API V1: Combo Views
"""
###
# Libraries
###
from rest_framework import viewsets
from app.combo.api.v1.serializers.combo.default import DefaultComboSerializer
from app.combo.models.combo import Combo


###
# Viewsets
###
class ComboViewSet(viewsets.ModelViewSet):
    queryset = Combo.objects.all()
    serializer_class = DefaultComboSerializer
