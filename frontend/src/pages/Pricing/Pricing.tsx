import PricingTable from "components/Pricing/PricingTable";
import React, {useEffect, useState} from "react";
import { getCombos } from "services/combo.service";
import { getAllProduct } from "services/product.service";
import { setSupplies } from "services/supply.service";
import { ProductTableProps } from "types/Product.types";

const Princing = () => {

return (
   <PricingTable />
)
}

export default Princing;