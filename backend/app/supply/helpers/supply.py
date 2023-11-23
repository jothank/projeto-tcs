###
# Lib
###
from rest_framework import serializers


###
# Helpers
###
def calculate_price(feedstock_price, feedstock_quantity, feedstock_unit, quantity, unit):
    small_units = ['g', 'ml']
    big_units = ['kg', 'l', 'un']

    if feedstock_unit not in small_units + big_units:
        raise serializers.ValidationError(
            f"Invalid feedstock unit: {feedstock_unit}")

    if unit not in small_units + big_units:
        raise serializers.ValidationError(
            f"Invalid supply unit: {unit}")

    if feedstock_unit in small_units:
        feedstock_cost_per_unit = feedstock_price / \
            (feedstock_quantity / 1000)
    else:
        feedstock_cost_per_unit = feedstock_price / feedstock_quantity

    if unit in small_units:
        return round(feedstock_cost_per_unit * (quantity / 1000), 2)
    else:
        return round(feedstock_cost_per_unit * quantity, 2)
