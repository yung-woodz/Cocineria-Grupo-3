import React, { useState } from 'react';
import useGetProducts from '@hooks/product/useGetProducts';
import useDeleteProduct from '@hooks/product/useDeleteProduct';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    TablePagination,
    Checkbox,
    IconButton,
    TextField,
    Button,
    MenuItem,
    Select,
    InputAdornment
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNavigate } from 'react-router-dom';
import CreateProduct from './createProduct';
import useUpdateProduct from '@hooks/product/useUpdateProduct';

import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { showErrorAlert } from "@helpers/sweetAlert";


const Inventory = () => {
    const { products, fetchProducts } = useGetProducts();
    const [page, setPage] = useState(0);
    const [selected, setSelected] = useState([]);
    const [filter, setFilter] = useState('');
    const [filterBy, setFilterBy] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');
    const rowsPerPage = 8;
    const navigate = useNavigate();
    const [quantities, setQuantities] = useState({});
    const { handleUpdate } = useUpdateProduct(fetchProducts);

    const [openPopup, setOpenPopup] = useState(false);

    const handleSuccess = (success) => {
        setOpenPopup(false);

        if (success) {
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }
    };

    const handleQuantityChange = (id, value) => {
        const newQuantity = Math.max(0, parseInt(value) || 0);
        setQuantities((prev) => ({ ...prev, [id]: newQuantity }));
    };

    const incrementQuantity = (id) => {
        setQuantities((prev) => ({
            ...prev,
            [id]: (prev[id] || 0) + 1,
        }));
    };

    const decrementQuantity = (id) => {
        setQuantities((prev) => ({
            ...prev,
            [id]: Math.max(0, (prev[id] || 0) - 1),
        }));
    };


    const { handleDelete } = useDeleteProduct(fetchProducts, setSelected);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = displayedProducts.map((product) => product.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleSelectClick = (id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        setSelected(newSelected);
    };

    const handleDeleteSelected = async () => {
        const success = await handleDelete(selected);

        if (success) {
            window.location.reload();
        }
    };

    const toggleSortOrder = () => {
        setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    };

    const filteredProducts = products
        .filter((product) => {
            if (!filter) return true;

            const valueToFilter = filterBy === 'entryDate' || filterBy === 'expirationDate'
                ? formatDate(product[filterBy])
                : product[filterBy]?.toString().toLowerCase();

            // Manejo especial para cantidad (número)
            if (filterBy === 'quantity') {
                const quantityValue = product.quantity?.toString() || '0';
                return quantityValue.includes(filter);
            }

            return valueToFilter.includes(filter.toLowerCase());
        })
        .sort((a, b) => {
            if (sortOrder === 'asc') {
                return a[filterBy] > b[filterBy] ? 1 : -1;
            } else {
                return a[filterBy] < b[filterBy] ? 1 : -1;
            }
        });


    const displayedProducts = filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="25vh" padding={2}>
            <TableContainer component={Paper} style={{ width: '100%', maxWidth: '2000px' }}>
                <Box display="flex" justifyContent="space-between" padding="15px" bgcolor="#212121" color="#fff">
                    <Box display="flex" alignItems="center">
                        <Select
                            value={filterBy}
                            onChange={(e) => setFilterBy(e.target.value)}
                            style={{
                                color: '#FFFFF',
                                backgroundColor: '#FFC107',
                                height: '35px',
                                fontSize: '14px',
                                borderTopLeftRadius: '4px',
                                borderBottomLeftRadius: '4px',
                                borderRight: '1px solid #212121',
                                marginRight: '-5px'
                            }}
                        >
                            <MenuItem value="name">Nombre</MenuItem>
                            <MenuItem value="type">Tipo</MenuItem>
                            <MenuItem value="quantity">Cantidad</MenuItem>
                            <MenuItem value="entryDate">Fecha de Ingreso</MenuItem>
                            <MenuItem value="expirationDate">Fecha de Expiración</MenuItem>
                        </Select>
                        <TextField
                            variant="outlined"
                            size="small"
                            placeholder={`Buscar ${filterBy}`}
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            style={{
                                backgroundColor: '#fff',
                                height: '35px',
                                fontSize: '14px',
                                borderTopRightRadius: '4px',
                                borderBottomRightRadius: '4px',
                                borderColor: 'transparent'
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <SearchIcon style={{ color: '#212121' }} />
                                    </InputAdornment>
                                )
                            }}
                        />
                        <IconButton onClick={toggleSortOrder} aria-label="Cambiar orden">
                            {sortOrder === 'asc' ? <ArrowDropUpIcon style={{ color: '#fff' }} /> : <ArrowDropDownIcon style={{ color: '#fff' }} />}
                        </IconButton>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                        <IconButton
                            onClick={handleDeleteSelected}
                            disabled={selected.length === 0}
                            aria-label="Eliminar seleccionados"
                            style={{
                                color: selected.length === 0 ? 'lightgray' : '#FF5722',
                            }}
                        >
                            <DeleteIcon />
                        </IconButton>

                        <IconButton
                            onClick={() => setOpenPopup(true)}
                            aria-label="Añadir producto"
                            style={{
                                color: '#4CAF50',
                            }}
                        >
                            <AddCircleIcon />
                        </IconButton>
                    </Box>
                </Box>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox" align="center">
                                <Checkbox
                                    indeterminate={selected.length > 0 && selected.length < displayedProducts.length}
                                    checked={displayedProducts.length > 0 && selected.length === displayedProducts.length}
                                    onChange={handleSelectAllClick}
                                />
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Imagen</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Nombre</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Cantidad</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Tipo</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Fecha Entrada</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Expiración</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {displayedProducts.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={selected.includes(product.id)}
                                        onChange={() => handleSelectClick(product.id)}
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    <img
                                        src={`http://146.83.198.35:1408/${product.image}`}
                                        alt={product.name}
                                        align="center"
                                        style={{ width: '50px', height: '50px', objectFit: 'cover', margin: '0 auto' }}
                                    />
                                </TableCell>
                                <TableCell align="center">{product.name}</TableCell>
                                <TableCell align="center">
                                    <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                                        <TextField
                                            type="number"
                                            value={quantities[product.id] ?? product.quantity}
                                            onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                                            variant="outlined"
                                            size="small"
                                            style={{ width: "80px" }}
                                            inputProps={{ min: 0 }}
                                        />
                                        <IconButton
                                            onClick={() => {
                                                const quantity = quantities[product.id];

                                                if (quantity <= 0) {
                                                    showErrorAlert("Error", "La cantidad debe ser mayor que 0.");
                                                    return;
                                                }

                                                console.log("ID del producto:", product.id);
                                                handleUpdate({ quantity }, product.id);
                                            }}
                                            aria-label="Actualizar cantidad"
                                            style={{ color: '#4CAF50' }}
                                        >
                                            <SaveIcon />
                                        </IconButton>

                                    </Box>
                                </TableCell>
                                <TableCell align="center">{product.type}</TableCell>
                                <TableCell align="center">{formatDate(product.entryDate)}</TableCell>
                                <TableCell align="center">{formatDate(product.expirationDate)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5]}
                    component="div"
                    count={filteredProducts.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    sx={{
                        backgroundColor: '#212121',
                        color: '#fff',
                    }}
                />
            </TableContainer>

            <Dialog open={openPopup} onClose={() => setOpenPopup(false)} maxWidth="md" fullWidth>
                <DialogTitle className='bg-[#212121] text-white '>
                    Crear Producto
                    <IconButton
                        aria-label="cerrar"
                        onClick={() => setOpenPopup(false)}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: 'white'
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent dividers>
                    <CreateProduct onSuccess={handleSuccess} />
                </DialogContent>
            </Dialog>

        </Box>

    );
};

export default Inventory;
