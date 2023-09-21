import { FeedStockTable } from "components/FeedStock/FeedStockTable"
import { ContainerResaleItem } from "components/ResaleItem/ContainerResaleItem"


export const FeedStock = () => {

    const data = [
        {
            id: 1,
            name: 'Queijo',
            price: 10,
            quantity: 10,
            unity: 'kg'
        }
    ]

    return (

        
        <>

       

        <ContainerResaleItem sizeForm="800px" heightForm="650px">
          <FeedStockTable data={data} />
        </ContainerResaleItem>
      </>
    )
}