import {Box,Grid,TextField,Button,MenuItem,Typography,CircularProgress,IconButton,} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import useCreateDish from "../hooks/dish/useCreateDish";
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
    } = useCreateDish();
    const { products } = useGetProducts(); 
    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                padding: 3,
                maxWidth: 600,
                margin: "auto",
                marginTop: "100px", 
            }}
        >
            <Typography variant="h5" align="center" sx={{  userSelect: 'none' }} >
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
                    <Typography variant="h6" sx={{userSelect: 'none',}}>Productos Requeridos: </Typography>
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
                </Grid>
                <Grid item xs={12}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={isSubmitting}
                        fullWidth
                        sx={{backgroundColor: "#212121",color: "white",
                            "&:hover": { backgroundColor: "#424242" },
                        }}
                    >
                        {isSubmitting ? <CircularProgress size={24} /> : "Crear Platillo"}
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};


export default CreateDishForm;