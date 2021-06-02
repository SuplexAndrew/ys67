import React, {useState} from 'react';
import {Paper, TableCell, TableContainer, TextField} from "@material-ui/core";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRowElement from "./TableRowElement.jsx";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import getSortFunction from "../SortFunctions.js";

const teams = [
    {id: 1, team: "Brazil"},
    {id: 2, team: "Argentina"},
    {id: 3, team: "Spain"},
    {id: 4, team: "Germany"},
]
const headers = [
    {id: 1, text: "#"},
    {id: 2, text: "Страна"},
    {id: 3, text: "Победы"},
    {id: 4, text: "Ничьи"},
    {id: 5, text: "Поражения"},
    {id: 6, text: "Мячей"},
    {id: 7, text: "Очков"}]

function MakeTable(matches) {
    let results = teams.map(t => ({...t, wins: 0, draws: 0, defeats: 0, goals: 0, matches: []}))
    for (let i = 0; i < matches.length; i++) {
        const team1 = results.find(t => t.team === matches[i].team1)
        const team2 = results.find(t => t.team === matches[i].team2)
        if (team1 && team2) {
            if (matches[i].goal1 > matches[i].goal2) {
                team1.wins++
                team2.defeats++
            } else if (matches[i].goal1 === matches[i].goal2) {
                team1.draws++
                team2.draws++
            } else {
                team2.wins++
                team1.defeats++
            }
            team1.goals += matches[i].goal1
            team2.goals += matches[i].goal2
            team1.matches.push(matches[i])
            team2.matches.push(matches[i])
        } else {
            console.log("no such team")
        }
    }
    return results
}

const TableElement = () => {
    const [matches, setMatches] = useState([
        {id: 1, team1: "Argentina", team2: "Brazil", goal1: 2, goal2: 0},
        {id: 2, team1: "Spain", team2: "Brazil", goal1: 0, goal2: 0},
        {id: 3, team1: "Argentina", team2: "Germany", goal1: 2, goal2: 3},
        {id: 4, team1: "Germany", team2: "Brazil", goal1: 1, goal2: 0},
    ])
    const [rows, setRows] = useState(MakeTable(matches))
    const [sortOption, setSortOption] = useState({column: 0, asc: false})
    const [filterField, setFilterField] = useState('')
    const HandleMatchesChange = (item) => {
        const items = matches
        const i = items.findIndex(x => x.id === item.id)
        items.splice(i, 1)
        setMatches([...items, item])
        setRows(MakeTable([...items, item]))
    }
    return (
        <div>
            <label htmlFor="">Filter: </label>
            <TextField id="outlined-basic" value={filterField}
                       onChange={e => setFilterField(e.target.value)}/>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            {headers.map(h =>
                                <TableCell align="center" key={h.id}
                                           onClick={() => {
                                               sortOption.asc ?
                                                   setSortOption({column: h.id, asc: false}) :
                                                   setSortOption({column: h.id, asc: true})}
                                           }
                                           scope="col">{h.text}</TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .filter(x => x.team.toLowerCase().includes(filterField.toLowerCase().trim()))
                            .sort(getSortFunction(sortOption))
                            .map((row) => (
                                <TableRowElement
                                    key={row.id} row={row}
                                    matches={matches.filter(m => m.team1 === row.team || m.team2 === row.team)}
                                    setMatches={HandleMatchesChange}
                                />
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default TableElement;