import Table from '@components/Table';
import useOrders from '@hooks/users/useGetOrders.jsx';
import { useCallback, useState } from 'react';
import '@styles/users.css';


const Notifications = () => {
    const { orders/* , fetchOrders, setOrders */ } = useOrders();
    /* const [filterRut, setFilterRut] = useState(''); */
  
    /* const {
      handleClickUpdate,
      handleUpdate,
      isPopupOpen,
      setIsPopupOpen,
      dataOrder,
      setDataUser
    } = useEditOrder(setOrders); */
  
    /* const { handleDelete } = useDeleteUser(fetchUsers, setDataUser); */
  
    /* const handleRutFilterChange = (e) => {
      setFilterRut(e.target.value);
    }; */
  
    /* const handleSelectionChange = useCallback((selectedOrders) => {
      setDataUser(selectedOrders);
    }, [setDataOrder]); */
  
    const columns = [
      { title: "Costumer", field: "costumer", width: 350, responsive: 0 },
      { title: "Table Number", field: "tableNumber", width: 300, responsive: 3 },
      { title: "Description", field: "description", width: 150, responsive: 2 },
      { title: "total", field: "Total", width: 200, responsive: 2 },
      { title: "Status", field: "status", width: 200, responsive: 2 },
      { title: "Creado", field: "createdAt", width: 200, responsive: 2 }
    ];
  
    return (
      <div className='main-container'>
        <div className='table-container'>
          <div className='top-table'>
            <h1 className='title-table'>Ordenes</h1>
            <div className='filter-actions'>
              {/* <Search value={filterRut} onChange={handleRutFilterChange} placeholder={'Filtrar por rut'} /> */}
              {/* <button onClick={handleClickUpdate} disabled={dataOrder.length === 0}>
                {dataOrder.length === 0 ? (
                  <img src={UpdateIconDisable} alt="edit-disabled" />
                ) : (
                  <img src={UpdateIcon} alt="edit" />
                )}
              </button> */}
              {/* <button className='delete-user-button' disabled={dataUser.length === 0} onClick={() => handleDelete(dataUser)}>
                {dataUser.length === 0 ? (
                  <img src={DeleteIconDisable} alt="delete-disabled" />
                ) : (
                  <img src={DeleteIcon} alt="delete" />
                )}
              </button> */}
            </div>
          </div>
          <Table
            data={orders}
            columns={columns}
            /* filter={filterRut}
            dataToFilter={'rut'} */
            initialSortName={'costumer'}
            /* onSelectionChange={handleSelectionChange} */
          />
        </div>
       {/*  <Popup /* show={isPopupOpen} setShow={setIsPopupOpen} */ /* data={dataOrder} action={handleUpdate} */ /> */}
      </div>
    );
};
  


export default Notifications;