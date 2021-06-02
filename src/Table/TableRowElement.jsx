import React from 'react';
import TableRow from "@material-ui/core/TableRow";
import Collapse from "@material-ui/core/Collapse";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import SubTable from "../Sub-Table/Sub-Table.jsx";



const TableRowElement = (props) => {
    const row = props.row
    const [open, setOpen] = React.useState(false)

    return (
        <>
            <TableRow>
                <TableCell align="center">
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                    {row.team}
                </TableCell>
                <TableCell align="center">{row.wins}</TableCell>
                <TableCell align="center">{row.draws}</TableCell>
                <TableCell align="center">{row.defeats}</TableCell>
                <TableCell align="center">{row.goals}</TableCell>
                <TableCell align="center">{row.wins * 3 + row.draws}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <SubTable matches={props.matches} setMatches={props.setMatches}/>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};

export default TableRowElement;