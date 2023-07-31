import { useState } from "react";
import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    Divider,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

// handling validation 
const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("Enter Your Email"),
    password: yup.string().min(5).required("required"),
});

const initialValuesLogin = {
    email: "",
    password: "",
};

const registerSchema = yup.object().shape({
    firstName: yup.string().required("Enter Your First Name"),
    lastName: yup.string().required("Enter Your Last Name"),
    email: yup.string().email("invalid email").required("Enter Your Email"),
    password: yup.string().min(5).required("Enter Password"),
    location: yup.string().required("required"),
    bio: yup.string().max(60).required("Tell us about yourself."),
});

const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    bio: "",
};


const Form = () => {
    const [pageType, setPageType] = useState("login");
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";
    const navigate = useNavigate();
    const register = async (values, onSubmitProps) => {
        // console.log(JSON.stringify(values));
        let savedUserRes = await fetch("http://localhost:3001/auth/register",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values)
            }
        )
        let savedUser = await savedUserRes.json();
        onSubmitProps.resetForm();
        if (savedUser) {
            setPageType("login");
        }
    }

    const login = async (values, onSubmitProps) => {
        const loggedInRes = await fetch("http://localhost:3001/auth/login",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            }
        )
        var loggedIn = "";
        loggedIn = await loggedInRes.json();
        if (loggedIn !== "") {
            onSubmitProps.resetForm();
            navigate("/home");
        }
    }

    const handleFormSubmit = async (values, onSubmitProps) => {
        if (isLogin) { await login(values, onSubmitProps); }
        if (isRegister) { await register(values, onSubmitProps) };
    };

    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
            validationSchema={isLogin ? loginSchema : registerSchema}
        >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm,
            }) => (
                <form onSubmit={handleSubmit} onChange={handleChange}>
                    <center>
                        <Box
                            width="80%"
                            p="1rem"
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            boxShadow="0px 0px 20px black"
                            borderRadius="1rem"
                        >
                            <Typography textAlign="center" marginBottom="1rem" fontFamily="monospace" fontSize="1.7rem" fontWeight="bold">
                                {isLogin ? "Sign In" : "Sign Up "}
                            </Typography>
                            <Divider sx={{margin:"0rem 0rem 1.2rem 0rem" ,border:"1px solid black"}} />
                            <Box
                                display="grid"
                                gap="15px"
                                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                sx={{
                                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                                }}
                            >
                                {isRegister && (
                                    <>
                                        <TextField
                                            fullWidth
                                            label="First Name"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.firstName}
                                            name="firstName"
                                            error={
                                                Boolean(touched.firstName) && Boolean(errors.firstName)
                                            }
                                            helperText={touched.firstName && errors.firstName}
                                            sx={{ gridColumn: "span 2" }}
                                        />
                                        <TextField
                                            label="Last Name"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.lastName}
                                            name="lastName"
                                            error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                            helperText={touched.lastName && errors.lastName}
                                            sx={{ gridColumn: "span 2" }}
                                        />
                                        <TextField
                                            label="Location"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.location}
                                            name="location"
                                            error={Boolean(touched.location) && Boolean(errors.location)}
                                            helperText={touched.location && errors.location}
                                            sx={{ gridColumn: "span 4" }}
                                        />
                                        <TextField
                                            label="Bio"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.bio}
                                            name="bio"
                                            error={
                                                Boolean(touched.bio) && Boolean(errors.bio)
                                            }
                                            helperText={touched.bio && errors.bio}
                                            sx={{ gridColumn: "span 4" }}
                                        />
                                    </>
                                )}

                                <TextField
                                    fullWidth
                                    label="Email"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.email}
                                    name="email"
                                    error={Boolean(touched.email) && Boolean(errors.email)}
                                    helperText={touched.email && errors.email}
                                    sx={{ gridColumn: "span 4" }}
                                />
                                <TextField
                                    fullWidth
                                    label="Password"
                                    type="password"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.password}
                                    name="password"
                                    error={Boolean(touched.password) && Boolean(errors.password)}
                                    helperText={touched.password && errors.password}
                                    sx={{ gridColumn: "span 4" }}
                                />
                            </Box>

                            {/* BUTTONS */}
                            <Box display="flex"
                                flexDirection="column"
                                justifyContent="center"
                                alignItems="center">
                                <Button
                                    type="submit"
                                    sx={{
                                        border: "1px solid black",
                                        borderRadius: "2rem",
                                        m: "1.5rem 0rem",
                                        p: "1rem 20%",
                                        backgroundColor: "lightgray",
                                        color: "black",
                                        "&:hover": { color: "black" },
                                    }}
                                >
                                    <Typography fontFamily="monospace">
                                        {isLogin ? "LOGIN" : "REGISTER"}
                                    </Typography>

                                </Button>
                                <Typography
                                    onClick={() => {
                                        setPageType(isLogin ? "register" : "login");
                                        resetForm();
                                    }}
                                    color="Highlight"
                                    sx={{
                                        textDecoration: "underline",
                                        "&:hover": {
                                            cursor: "pointer",
                                            color: "black",
                                        },
                                    }}
                                >
                                    {isLogin
                                        ? "Don't have an account? Sign Up here."
                                        : "Already have an account? Login here."}
                                </Typography>
                            </Box>
                        </Box>
                    </center>
                </form>
            )}
        </Formik>
    );
};

export default Form;