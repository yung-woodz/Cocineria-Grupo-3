import React from "react";
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    MenuItem,
    Typography,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import useUpdateDish from "../hooks/dish/useUpdateDish";
import useGetProducts from "../hooks/product/useGetProducts";


const UpdatePopup = ({ open, onClose, dishData, fetchDishes }) => {
    const { products } = useGetProducts();
    const {
        formData,
        errors,
        handleChange,
        handleProductChange,
        handleAddProduct,
        handleRemoveProduct,
        handleSubmit,
    } = useUpdateDish(dishData, fetchDishes, onClose);

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle sx={{ backgroundColor: "#212121", color: "white", textAlign: "center" }}>
            Editar Platillo</DialogTitle>
            <DialogContent sx={{ backgroundColor: "#FFFFFF" }}>
                <TextField
                    margin="dense"
                    name="Nombre"
                    label="Nombre del Platillo"
                    value={formData.Nombre}
                    onChange={handleChange}
                    fullWidth
                    error={!!errors.Nombre}
                    helperText={errors.Nombre}
                    required
                />
                <TextField
                    margin="dense"
                    name="descripcion"
                    label="Descripción"
                    value={formData.descripcion}
                    onChange={handleChange}
                    fullWidth
                    multiline
                    rows={3}
                    error={!!errors.descripcion}
                    helperText={errors.descripcion}
                    required
                />
                <TextField
                    margin="dense"
                    name="precio"
                    label="Precio"
                    type="number"
                    value={formData.precio}
                    onChange={handleChange}
                    fullWidth
                    error={!!errors.precio}
                    helperText={errors.precio}
                    required
                    
                />
                <TextField
                    margin="dense"
                    name="tiempoDeEspera"
                    label="Tiempo de Espera (minutos)"
                    type="number"
                    value={formData.tiempoDeEspera}
                    onChange={handleChange}
                    fullWidth
                    error={!!errors.tiempoDeEspera}
                    helperText={errors.tiempoDeEspera}
                    required
                    
                />
                <Typography variant="h6" sx={{ mt: 2 }}>
                    Productos Requeridos:
                </Typography>
                {formData.DishProducts.map((product, index) => (
                    <Grid container spacing={1} key={index} alignItems="center">
                        <Grid item xs={6}>
                            <TextField
                                select
                                value={product.productId}
                                onChange={(e) =>
                                    handleProductChange(index, "productId", e.target.value)
                                }
                                fullWidth
                                required
                                
                            >
                                {products.map((prod) => (
                                    <MenuItem key={prod.id} value={prod.id}>
                                        {prod.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                type="number"
                                value={product.quantity}
                                onChange={(e) =>
                                    handleProductChange(index, "quantity", e.target.value)
                                }
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <IconButton onClick={() => handleRemoveProduct(index)}>
                                <RemoveCircleOutlineIcon sx={{ color: "#D32F2F" }} />
                            </IconButton>
                        </Grid>
                    </Grid>
                ))}
                <Button
                    variant="outlined"
                    startIcon={<AddCircleOutlineIcon />}
                    onClick={handleAddProduct}
                    sx={{mt: 2,borderColor: "#FFC107",color: "#212121",
                        "&:hover": {backgroundColor: "#FFB300",},
                    }}
                >
                    Agregar Producto
                </Button>
            </DialogContent>
            <DialogActions sx={{ backgroundColor: "#FAFAFA" }}>
                <Button onClick={onClose}
                    sx={{backgroundColor: "#E0E0E0",color: "#212121",
                        "&:hover": { backgroundColor: "#BDBDBD" },
                    }}
                    >Cancelar</Button>
                <Button onClick={handleSubmit} 
                    sx={{backgroundColor: "#212121",color: "white",
                        "&:hover": { backgroundColor: "#424242" },
                    }}>
                    Guardar Cambios
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UpdatePopup;