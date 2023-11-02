import CommandsComboTable from "components/Commands/CommandsComboTable";
import React, { useEffect, useState } from "react";
import { getCombos } from "services/combo.service";

export const CommandCombo = () => {

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
  
    return <CommandsComboTable data={combos} />;

}

export default CommandCombo;