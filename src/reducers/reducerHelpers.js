export const sortData = (data, currentSortField, fieldToSort, sortDirectionAsc) => {
    let sortedData = [...data];
    const sortDirAsc = computeSortDirectionAsc(currentSortField, fieldToSort, sortDirectionAsc);

    sortedData.sort( (a,b) => {
        switch(fieldToSort) {
            case "firstName":
            case "lastName":
            case "phone":
                return sortDirAsc
                    ? a[fieldToSort].localeCompare(b[fieldToSort])
                    : b[fieldToSort].localeCompare(a[fieldToSort]);
            case "age":
                return sortDirAsc
                    ? a[fieldToSort] - b[fieldToSort] 
                    : b[fieldToSort] - a[fieldToSort];
            case "gender":
                return sortDirAsc
                    ? ( a[fieldToSort] === b[fieldToSort] ? 0 : a[fieldToSort] ? -1 : 1 )
                    : a[fieldToSort] === b[fieldToSort] ? 0 : a[fieldToSort] ? 1 : -1;
        }
        
    });

    return sortedData;
}

export const computeSortDirectionAsc = (currentSortField, fieldToSort, sortDirectionAsc) => {
    return ( currentSortField === fieldToSort ) 
        ? ( sortDirectionAsc === null ) 
            ? true
            : !sortDirectionAsc
        : true;
}