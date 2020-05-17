import React, { useState } from "react";
import {
    makeStyles,
    Avatar,
    Button,
    TextField,
    FormControlLabel,
    Grid,
    Box,
    Container,
    Typography,
    CssBaseline,
    Radio,
    RadioGroup,
    FormControl,
    FormLabel,
    MenuItem,
} from "@material-ui/core";
import UpdateIcon from "@material-ui/icons/Update";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import isEmpty from "lodash/isEmpty";
import { validateEmail } from "../utils/validator";
import { useApp } from "../Context/app-context";
import { createUser, updateUser } from "../services/Api";


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatarUpdate: {
        margin: theme.spacing(1),
        backgroundColor: "#f50057",
        color: "#fff",
    },
    avatarCreate: {
        margin: theme.spacing(1),
        backgroundColor: "#3f51b5",
        color: "#fff",
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    select: {
        width: "100%",
    },
}));

export default function Form({ setOpenModal, setOpenAlerts, rowUpdate, setRowUpdate }) {
    const classes = useStyles();

    const [formData, setFormData] = useState(isEmpty(rowUpdate) ? defaultValue : rowUpdate);
    const [errors, setErrors] = useState(defaultErrors);
    // data context
    const { phoneTypes, users, setUsers } = useApp();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const create = async () => {
        try {
            const response = await createUser(formData);

            const { data } = response.data;

            if (response.status === 201) {
                setUsers([
                    ...users,
                    data
                ]);

                setOpenModal(false);
                setRowUpdate({});
                setOpenAlerts({ open: true, msg: "User Create Successful", type: "success" });
            } else {
                setOpenAlerts({ open: true, msg: "Duplicate email, please enter another", type: "warning" });
            }

        } catch (error) {
            console.log(error);
        }
    }

    const update = async () => {
        try {
            await updateUser(formData);

            let arrUsers = users.map(user => {
                if (user._id === formData._id) {
                    user = formData;
                }
                return user;
            });

            setUsers(arrUsers);

            setOpenModal(false);

            setRowUpdate({});

            setOpenAlerts({ open: true, msg: "User Update Successful", type: "success" });
        } catch (error) {
            console.log(error);
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        let arrErrros = {};

        if (!formData.firstName ||
            !formData.lastName ||
            !formData.email ||
            !formData.phone) {

            arrErrros = {
                firstName: !formData.firstName && true,
                lastName: !formData.lastName && true,
                email: !formData.email && true,
                phone: !formData.phone && true
            };

        } else if ( !validateEmail(formData.email) ) {
            arrErrros = { email: true };
        } else {
            isEmpty(rowUpdate) ? create() : update();
        }

        setErrors(arrErrros);
    }

    return (
        <Container>
            <Box my={2}>
                <Container component="main" maxWidth="sm">
                    <CssBaseline />
                    <div className={classes.paper}>

                        <Avatar className={isEmpty(rowUpdate) ? classes.avatarCreate : classes.avatarUpdate}>
                            {isEmpty(rowUpdate) ? <PersonAddIcon /> : <UpdateIcon />}
                        </Avatar>

                        <Typography component="h1" variant="h5">
                            {isEmpty(rowUpdate) ? "Create User" : "Updated User"}
                        </Typography>
                        <form className={classes.form} onSubmit={e => onSubmit(e)} noValidate>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="firstName"
                                        defaultValue={formData.firstName}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                        onChange={e => handleChange(e)}
                                        error={errors.firstName}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="lastName"
                                        defaultValue={formData.lastName}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        onChange={e => handleChange(e)}
                                        error={errors.lastName}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">Sex</FormLabel>
                                        <RadioGroup row aria-label="sex" name="gender" value={formData.gender} onChange={(e) => handleChange(e)}>
                                            <FormControlLabel value="m" control={<Radio />} label="Male" />
                                            <FormControlLabel value="f" control={<Radio />} label="Female" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="email"
                                        defaultValue={formData.email}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        onChange={e => handleChange(e)}
                                        error={errors.email}
                                        helperText={errors.email ? "Invalid email" : null}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="phoneType"
                                        id="phoneType"
                                        select
                                        label="Phone Type"
                                        value={formData.phoneType}
                                        onChange={e => handleChange(e)}
                                        variant="outlined"
                                        className={classes.select}
                                    >
                                        {phoneTypes.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="phone"
                                        defaultValue={formData.phone}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="phone"
                                        label="Phone"
                                        onChange={e => handleChange(e)}
                                        error={errors.phone}
                                    />
                                </Grid>
                            </Grid>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color={isEmpty(rowUpdate) ? "primary" : "secondary"}
                                className={classes.submit}
                            >
                                {isEmpty(rowUpdate) ? "Create User" : "Update User"}
                            </Button>
                        </form>
                    </div>
                </Container>
            </Box>
        </Container>
    );
}

function defaultValue() {

    return {
        firstName: "",
        lastName: "",
        gender: "m",
        email: "",
        phoneType: 1,
        phone: ""
    }
}

function defaultErrors() {

    return {
        firstName: false,
        lastName: false,
        email: false,
        phone: false
    }
}