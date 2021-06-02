import React, {useState} from 'react';
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import {TextField} from "@material-ui/core";

const SubTable = (props) => {
    const matches = props.matches.sort((x ,y) => x.id < y.id)
    const editDefault = {editMode: false, row: -1, cell: -1}
    const [edit, setEdit] = useState(editDefault)
    const [editField, setEditField] = useState('')

    const onConfirmEdit = (e) => {
        if(e.key === "Enter"){
            const tt = matches.find(x => x.id === edit.row)
            switch (edit.cell){
                case 0:
                    /*const item = {...matches[edit.row - 1], team1: editField}
                    console.log(item)
                    const i = matches
                    i.splice(edit.row - 1, 1)
                    i.push(item)
                    console.log(i)
                    props.setMatches(i)*/
                    break
                case 1:
                    tt.goal1 =  parseInt(editField)
                    props.setMatches(tt)
                    setEdit(editDefault)
                    setEditField("")
                    break
                case 2:
                    tt.goal2 =  parseInt(editField)
                    props.setMatches(tt)
                    setEdit(editDefault)
                    setEditField("")
                    break
                default:
                    break
            }
        }
    }

    return (
        <Table size="small" onKeyDown={onConfirmEdit} className="sub-table">
            <TableBody>
                {matches.map(m => <SubTableRow
                    key={m.id}
                    match={m}
                    edit={edit}
                    setEdit={setEdit}
                    editField={editField}
                    setEditField={setEditField}
                    />)}
            </TableBody>
        </Table>
    )
}
const SubTableRow = (props) => {
    const m = props.match
    const HandlerClick = (e) => {
        //console.log(m)
        e.stopPropagation()
            props.setEdit({editMode: true, row: m.id, cell: e.target.cellIndex})
    }
    return (
        <TableRow>
            <TableCell align="center" onClick={HandlerClick}>
                {props.edit.cell === 0 && m.id === props.edit.row ?
                    <TextField
                        onClick={e => e.stopPropagation()}
                        value={props.editField}
                        onChange={(e) =>
                            props.setEditField(e.target.value)}/>
                    : m.team1}</TableCell>
            <TableCell align="center" onClick={HandlerClick}>
                {props.edit.cell === 1 && m.id === props.edit.row ?
                    <TextField
                        onClick={e => e.stopPropagation()}
                        value={props.editField}
                        onChange={(e) =>
                            props.setEditField(e.target.value)}/>
                    : m.goal1}</TableCell>
            <TableCell align="center" onClick={HandlerClick}>
                {props.edit.cell === 2 && m.id === props.edit.row ?
                    <TextField
                        onClick={e => e.stopPropagation()}
                        value={props.editField}
                        onChange={(e) =>
                            props.setEditField(e.target.value)}/>
                    : m.goal2}</TableCell>
            <TableCell align="center" onClick={HandlerClick}>
                {props.edit.cell === 3 && m.id === props.edit.row ?
                    <TextField
                        onClick={e => e.stopPropagation()}
                        value={props.editField}
                        onChange={(e) =>
                            props.setEditField(e.target.value)}/>
                    : m.team2}</TableCell>
        </TableRow>
    )
}

export default SubTable