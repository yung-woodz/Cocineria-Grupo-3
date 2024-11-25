import Table from "../components/Table";
import useGetOrders from "../hooks/order/useGetOrders";
import DeleteIcon from "../assets/deleteIcon.svg";
import DeleteIconDisable from "../assets/deleteIconDisabled.svg";
import useDeleteOrder from "../hooks/order/useDeleteOrder";

const Allorders = () => {
    const { orders, fetchOrders, setOrders } = useGetOrders();


    const columns = [
        { title: 'ID', field: 'id', width: 70, responsive: 0 },
        { title: 'Cliente', field: 'customer', width: 350, responsive: 0 },
        { title: 'Numero de mesa', field: 'tableNumber', width: 200, responsive: 2 },
        { title: 'Descripcion', field: 'description', width: 150, responsive: 2 },
        { title: 'Estado', field: 'status', width: 200, responsive: 2 },
        /* { title: 'Hora', field: 'date', width: 200, responsive: 2 }, */
        { title: 'Usuario', field: 'user.nombreCompleto', width: 200, responsive: 2 },
    ];

const { handleDelete } = useDeleteOrder(fetchOrders, setOrders);


    return (
        <div className='main-container'>
            <div className='table-container'>
                <div className='top-table'>
                    <h1 className='title-table'>Ordenes</h1>
                    <div className='filter-actions'>
                        <button className='delete-user-button' disabled={orders.length === 0} onClick={() => handleDelete(orders)}>
                            {orders.length === 0 ? (
                                <img src={DeleteIconDisable} alt="delete-disabled" />
                            ) : (
                                <img src={DeleteIcon} alt="delete" />
                            )}
                        </button>
                    </div>
                </div>
                <Table
                    columns={columns}
                    data={orders}
                    fetchData={fetchOrders}
                    handleDelete={handleDelete}
                />
            </div>
        </div>
    );
};

export default Allorders;