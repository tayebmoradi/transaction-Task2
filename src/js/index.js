document.getElementById('dataApi').addEventListener('click', function() {
    const apiUrl = 'http://localhost:3000/transactions'; 

    axios.get(apiUrl)
    .then(response => {
        const data = response.data;
        const tableBody = document.querySelector('#dataTable tbody');
        tableBody.innerHTML = ''; 

       
        let rowsHtml = '';
        data.forEach(item => {
         
            const date = new Date(item.date).toLocaleDateString('fa-IR');
            
            rowsHtml += `
                <tr>
                    <td>${item.id}</td>
                    <td>${item.type}</td>
                    <td>${item.price}</td>
                    <td>${item.refId}</td>
                    <td>${date}</td>
                </tr>
            `;
        });

        
        tableBody.innerHTML = rowsHtml;
    })
    .catch(error => {
        alert('Error: ' + error.message);
    });
});
