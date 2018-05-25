
export function displayPrediction(labels: any, values: any) {
    let contents: string = "";
    let tableBody = <HTMLTableElement> document.getElementById('results-table-body');
    let row: any;
    let cell: any;
    let newTableBody = document.createElement('tbody');
    newTableBody.setAttribute('id', 'results-table-body');
    for (let i=0; i < labels.length; i+= 1){
        row = newTableBody.insertRow(-1);
        cell = row.insertCell(0);
        cell.innerHTML = labels[i].toString();
        cell = row.insertCell(1);
        cell.innerHTML = values[i].toFixed(3).toString();
        console.log(contents);
    }
    tableBody.parentNode.replaceChild(newTableBody, tableBody);
}