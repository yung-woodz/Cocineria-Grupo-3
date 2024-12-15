import React, { useState } from "react";
import { Box, Grid, TextField, Button, MenuItem, Typography, CircularProgress, IconButton } from "@mui/material";
import { useDropzone } from "react-dropzone";
import CancelIcon from "@mui/icons-material/Cancel";
import useCreateProduct from "@hooks/product/useCreateProduct";

const CreateProduct = ({ onSuccess }) => {

    const { form, isSubmitting, errors, handleChange, handleFileChange, handleSubmit: submitForm } = useCreateProduct();
    const [previewImage, setPreviewImage] = useState(null); 

    const handleSubmit = async (event) => {
        event.preventDefault();
        const success = await submitForm(event);
        onSuccess(success);  
        
    };    

    const onDrop = (acceptedFiles) => {
        const validFiles = acceptedFiles.filter(file =>
            file.type === "image/jpeg" || file.type === "image/png"
        );
        if (validFiles.length > 0) {
            const file = validFiles[0];
            setPreviewImage(URL.createObjectURL(file)); 
            handleFileChange({ target: { files: validFiles } });
        }
    };

    const cancelImage = () => {
        setPreviewImage(null); 
        handleFileChange({ target: { files: [] } }); 
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "image/jpeg": [".jpg", ".jpeg"],
            "image/png": [".png"],
        },
        multiple: false, 
    });

    const handleNumericChange = (e) => {
        const { name, value } = e.target;
        if (/^\d*$/.test(value)) {
            handleChange(e); 
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
                mt: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
                padding: 4,
            }}
        >
            <Typography variant="h4" align="center" gutterBottom>
                Agregar Producto
            </Typography>
            <Grid container spacing={2} maxWidth="sm">
                <Grid item xs={12}>
                    <TextField
                        name="name"
                        required
                        fullWidth
                        label="Nombre"
                        value={form.name}
                        onChange={handleChange}
                        error={!!errors.name}
                        helperText={errors.name}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="type"
                        required
                        fullWidth
                        select
                        label="Tipo"
                        value={form.type}
                        onChange={handleChange}
                        error={!!errors.type}
                        helperText={errors.type}
                    >
                        <MenuItem value="otros">Otros</MenuItem>
                        <MenuItem value="lacteo">Vegetales</MenuItem>
                        <MenuItem value="pasta">Pasta</MenuItem>
                        <MenuItem value="especia">Especia</MenuItem>
                        <MenuItem value="carne">Carne</MenuItem>
                        <MenuItem value="pescado">Pescado</MenuItem>
                        <MenuItem value="fruta">Fruta</MenuItem>
                        <MenuItem value="marisco">Marisco</MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="quantity"
                        required
                        fullWidth
                        label="Cantidad"
                        type="text"
                        value={form.quantity}
                        onChange={handleNumericChange} 
                        error={!!errors.quantity}
                        helperText={errors.quantity}
                        inputProps={{
                            inputMode: "numeric",
                            pattern: "[0-9]*",
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="entryDate"
                        required
                        fullWidth
                        label="Fecha Entrada"
                        type="date"
                        value={form.entryDate}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        error={!!errors.entryDate}
                        helperText={errors.entryDate}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="expirationDate"
                        required
                        fullWidth
                        label="Fecha Expiración"
                        type="date"
                        value={form.expirationDate}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        error={!!errors.expirationDate}
                        helperText={errors.expirationDate}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Box
                        {...getRootProps()}
                        sx={{
                            border: "2px dashed #ccc",
                            borderRadius: 4,
                            padding: 4,
                            textAlign: "center",
                            cursor: "pointer",
                            backgroundColor: isDragActive ? "#e6f7ff" : "#fafafa",
                            position: "relative",
                            transition: "background-color 0.2s",
                            height: 250,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                        }}
                    >
                        {previewImage ? (
                            <>
                                <Box
                                    component="img"
                                    src={previewImage}
                                    alt="Preview"
                                    sx={{
                                        maxWidth: "100%",
                                        maxHeight: "100%",
                                        objectFit: "contain",
                                    }}
                                />
                                <IconButton
                                    onClick={cancelImage}
                                    sx={{
                                        position: "absolute",
                                        top: 8,
                                        right: 8,
                                        width: 40,  
                                        height: 40, 
                                        padding: 0, 
                                        backgroundColor: "#fff",
                                        borderRadius: "50%", 
                                        "&:hover": { backgroundColor: "#f5f5f5" },
                                    }}
                                >
                                    <CancelIcon sx={{ fontSize: 24 }} /> 
                                </IconButton>
                            </>
                        ) : (
                            <>
                                <input {...getInputProps()} />
                                <Typography variant="body1" gutterBottom>
                                    {isDragActive ? "Soltar el Archivo ..." : "Arrastra el archivo, o haz click para seleccionar"}
                                </Typography>
                                <Button variant="contained" sx={{ mt: 2, backgroundColor: "#FFC107", color: "black", }}>
                                    Seleccionar Archivo
                                </Button>
                            </>
                        )}
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={isSubmitting}
                        sx={{ mt: 3, mb: 2, backgroundColor: "#212121"}}
                    >
                        {isSubmitting ? <CircularProgress size={24} /> : "Crear Producto"}
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default CreateProduct;
