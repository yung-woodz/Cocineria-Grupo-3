
import {
    Box,
    Grid,
    TextField,
    Button,
    MenuItem,
    Typography,
    CircularProgress,
    IconButton,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import DishForm from "../hooks/dish/DishForm";
import useGetProducts from "../hooks/product/useGetProducts";

const CreateDishForm = () => {
    const {
        form,
        isSubmitting,
        errors,
        handleChange,
        handleAddProduct,
        handleRemoveProduct,
        handleProductChange,
        handleSubmit,
    } = DishForm();
    const { products } = useGetProducts(); 
    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                padding: 3,
                maxWidth: 600,
                margin: "auto",
                marginTop: "100px", // Ajuste para separar del Navbar
            }}
        >
            <Typography variant="h5" align="center" gutterBottom>
                Crear Nuevo Platillo
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        name="Nombre"
                        label="Nombre del Platillo"
                        value={form.Nombre}
                        onChange={handleChange}
                        fullWidth
                        required
                        error={!!errors.Nombre}
                        helperText={errors.Nombre}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="descripcion"
                        label="Descripción"
                        value={form.descripcion}
                        onChange={handleChange}
                        fullWidth
                        multiline
                        rows={4}
                        required
                        error={!!errors.descripcion}
                        helperText={errors.descripcion}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        name="precio"
                        label="Precio"
                        type="number"
                        value={form.precio}
                        onChange={handleChange}
                        fullWidth
                        required
                        error={!!errors.precio}
                        helperText={errors.precio}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        name="tiempoDeEspera"
                        label="Tiempo de Espera"
                        type="number"
                        value={form.tiempoDeEspera}
                        onChange={handleChange}
                        fullWidth
                        required
                        error={!!errors.tiempoDeEspera}
                        helperText={errors.tiempoDeEspera}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="image"
                        label="URL de la Imagen"
                        value={form.image}
                        onChange={handleChange}
                        fullWidth
                        required
                        error={!!errors.image}
                        helperText={errors.image || "Ingresa la URL de la imagen del platillo"}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6">Productos Requeridos:</Typography>
                    {form.DishProducts.map((product, index) => (
                        <Grid container spacing={1} key={index} sx={{ mb: 1 }}>
                            <Grid item xs={6}>
                                <TextField
                                    select
                                    label="Producto"
                                    value={product.productId}
                                    onChange={(e) =>
                                        handleProductChange(index, "productId", e.target.value)
                                    }
                                    fullWidth
                                    required
                                    error={!!errors[`DishProducts.${index}.productId`]}
                                    helperText={errors[`DishProducts.${index}.productId`]}
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
                                    label="Cantidad"
                                    type="number"
                                    value={product.quantity}
                                    onChange={(e) =>
                                        handleProductChange(index, "quantity", e.target.value)
                                    }
                                    fullWidth
                                    required
                                    error={!!errors[`DishProducts.${index}.quantity`]}
                                    helperText={errors[`DishProducts.${index}.quantity`]}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <IconButton onClick={() => handleRemoveProduct(index)}>
                                    <RemoveCircleOutlineIcon color="error" />
                                </IconButton>
                            </Grid>
                        </Grid>
                    ))}
                    <Button
                        variant="outlined"
                        startIcon={<AddCircleOutlineIcon />}
                        onClick={handleAddProduct}
                        sx={{ mt: 2 }}
                    >
                        Agregar Producto
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={isSubmitting}
                        fullWidth
                    >
                        {isSubmitting ? <CircularProgress size={24} /> : "Crear Platillo"}
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};


export default CreateDishForm;