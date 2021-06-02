function getSortFunction({column, asc}) {
    switch (column) {
        case 1:
            if (asc) {
                return (x, y) => x.id - y.id
            } else {
                return (x, y) => y.id - x.id
            }
        case 2:
            if (asc) {
                return (x, y) => {
                    if (x.team < y.team) return 1
                    if (x.team > y.team) return -1
                    return 0
                }
            } else {
                return (x, y) => {
                    if (x.team < y.team) return -1
                    if (x.team > y.team) return 1
                    return 0
                }
            }
        case 3:
            if (asc) {
                return (x, y) => {
                    if (x.wins < y.wins) return 1
                    if (x.wins > y.wins) return -1
                    return 0
                }
            } else {
                return (x, y) => {
                    if (x.wins < y.wins) return -1
                    if (x.wins > y.draws) return 1
                    return 0
                }
            }
        case 4:
            if (asc) {
                return (x, y) => {
                    if (x.draws < y.draws) return 1
                    if (x.draws > y.draws) return -1
                    return 0
                }
            } else {
                return (x, y) => {
                    if (x.draws < y.draws) return -1
                    if (x.draws > y.draws) return 1
                    return 0
                }
            }
        case 5:
            if (asc) {
                return (x, y) => {
                    if (x.defeats < y.defeats) return 1
                    if (x.defeats > y.defeats) return -1
                    return 0
                }
            } else {
                return (x, y) => {
                    if (x.defeats < y.defeats) return -1
                    if (x.defeats > y.defeats) return 1
                    return 0
                }
            }
        case 6:
            if (asc) {
                return (x, y) => {
                    if (x.goals < y.goals) return 1
                    if (x.goals > y.goals) return -1
                    return 0
                }
            } else {
                return (x, y) => {
                    if (x.goals < y.goals) return -1
                    if (x.goals > y.goals) return 1
                    return 0
                }
            }
        case 7:
            if (asc) {
                return (x, y) => {
                    if (x.wins * 3 + x.draws < y.wins * 3 + y.draws) return 1
                    if (x.wins * 3 + x.draws > y.wins * 3 + y.draws) return -1
                    return 0
                }
            } else {
                return (x, y) => {
                    if (x.wins * 3 + x.draws < y.wins * 3 + y.draws) return -1
                    if (x.wins * 3 + x.draws > y.wins * 3 + y.draws) return 1
                    return 0
                }
            }
        default:
            break
    }
}

export default getSortFunction