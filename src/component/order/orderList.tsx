import { useEffect, useState } from "react";
import { getOrders } from "../../services/JournalService";
import type { OrderListInterface } from "../../types/OrderController";

const OrderList = () => {
    const [orderList, setOrderList] = useState<OrderListInterface[] | null>(null)
    const fetchOrderList = async () => {
        try {
            const data = await getOrders();
            if (data.data && data.data.length > 0) {
                setOrderList(data.data)
            }
        } catch (error) {

        }
    }
    useEffect(() => {
        fetchOrderList()
    }, [])
    return (
        <>
            <h1>Order List</h1> length is
            {orderList?.length}
            {Array.isArray(orderList) && orderList.length > 0 ?
                <>
                    {orderList.map((item, index) => {
                        return (
                            <>
                                <p>Sidd</p>
                                {item.status}
                                <p> inner length is - </p>
                                {item.items && item.items.length > 0 &&

                                    item.items.map((item, index) => {
                                        return (
                                            <>
                                                <p>{item.menu.name}</p>
                                            </>
                                        )
                                    })

                                }
                            </>
                        )
                    })}
                </>
                :
                <>
                    No data found
                </>
            }
        </>
    )
};
export default OrderList;
