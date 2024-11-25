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

const Inventory = () => {
    const { products, fetchProducts } = useGetProducts();
    const [page, setPage] = useState(0);
    const [selected, setSelected] = useState([]);
    const [filter, setFilter] = useState('');
    const [filterBy, setFilterBy] = useState('name'); 
    const [sortOrder, setSortOrder] = useState('asc'); 
    const rowsPerPage = 5;
    const navigate = useNavigate();
    
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

    const handleDeleteSelected = () => {
        handleDelete(selected);
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
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f5f5f5" padding={2}>
            <TableContainer component={Paper} style={{ width: '100%', maxWidth: '900px' }}>
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
                            <MenuItem value="id">ID</MenuItem>
                            <MenuItem value="type">Tipo</MenuItem>
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
                            onClick={() => navigate('/inventory/create-product')}
                            aria-label="Añadir producto"
                            style={{
                                color: '#4CAF50', // Color verde (puedes ajustar según sea necesario)
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
                            <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>ID</TableCell>
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
                                <TableCell align="center">{product.id}</TableCell>
                                <TableCell align="center">
                                    <img 
                                        src={`http://localhost:3000/${product.image}`} 
                                        alt={product.name} 
                                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                    />
                                </TableCell>
                                <TableCell align="center">{product.name}</TableCell>
                                <TableCell align="center">{product.quantity}</TableCell>
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
        </Box>
    );
    
};

export default Inventory;
