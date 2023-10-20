import ComboTable from "components/Combo/ComboTable";
import React, { useEffect, useState } from "react";
import { getCombos } from "services/combo.service";

const Product: React.FC = () => {
  const [combos, setCombos] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getCombos();
        setCombos(data);
      } catch (error: any) {
        console.error("Failed to fetch feedstocks:", error.message);
      }
    };

    fetchProducts();
  }, []);

  return <ComboTable data={combos} />;
};

export default Product;
