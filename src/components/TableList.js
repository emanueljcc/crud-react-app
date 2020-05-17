import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Tooltip,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useApp } from "../Context/app-context.js";
import { removeUser } from "../services/Api";

const useStyles = makeStyles((theme) => ({
    margin: {
        marginLeft: "10%",
    },
    btnRemove: {
        color: theme.palette.secondary.main,
    },
    btnEdit: {
        color: "#3f51b5",
    },
    top: {
        marginTop: 50,
    }
}));

function TableList({ setOpenAlerts, setOpenModal, rowUpdate, setRowUpdate }) {
    const classes = useStyles();

    const { users, setUsers } = useApp();

    const remove = async (id) => {
        try {
            const arrUsers = users.filter(user => user._id !== id);

            setUsers(arrUsers);

            await removeUser(id);

            setOpenAlerts({ open: true, msg: "User Delete Successful", type: "success" });
        } catch (error) {
            console.log(error);
        }
    }

    const update = (data) => {
        setRowUpdate(data);
        setOpenModal(true);
    }

    return (
        <TableContainer component={Paper} className={classes.top}>
            <Table style={{ width: "100%" }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>First Name</TableCell>
                    <TableCell align="center">Last Name</TableCell>
                    <TableCell align="center">Sex</TableCell>
                    <TableCell align="center">Phone</TableCell>
                    <TableCell align="center">Email</TableCell>
                    <TableCell align="center">Actions</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {users.map((row, i) => (
                    <TableRow key={i}>
                        <TableCell component="th" scope="row">
                            {row.firstName}
                        </TableCell>
                        <TableCell align="center">{row.lastName}</TableCell>
                        <TableCell align="center">{row.gender}</TableCell>
                        <TableCell align="center">
                            {showType(row.phoneType)} - {row.phone}
                        </TableCell>
                        <TableCell align="center">{row.email}</TableCell>
                        <TableCell align="center" style={{ width: "30%" }}>

                            <Tooltip title="Edit" placement="top">
                                <IconButton
                                    aria-label="delete"
                                    className={[classes.margin, classes.btnEdit].join(" ")}
                                    onClick={() => update(row)}
                                >
                                    <EditIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Remove" placement="top">
                                <IconButton
                                    aria-label="delete"
                                    className={[classes.margin, classes.btnRemove].join(" ")}
                                    onClick={() => remove(row._id)}
                                >
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>

                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

function showType(id) {
    let type = "";

    switch (parseInt(id)) {
        case 1:
            type = "home";
            break;
        case 2:
            type = "cel";
            break;
        case 3:
            type = "work";
            break;
        default:
            type = "others";
            break;
    }

    return type;
}

export default TableList;