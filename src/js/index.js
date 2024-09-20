let allData = [];

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

document.getElementById('searchButton').addEventListener('click', function() {
    const searchRefId = document.getElementById('searchInput').value;
    if (!searchRefId) {
        alert('لطفاً شماره پیگیری را وارد کنید.');
        return;
    }

   
    const searchApiUrl = `http://localhost:3000/transactions?refId=${searchRefId}`;

    axios.get(searchApiUrl)
        .then(response => {
            const data = response.data;
            const tableBody = document.querySelector('#dataTable tbody');
            tableBody.innerHTML = ''; 

           
            if (data.length === 0) {
                tableBody.innerHTML = '<tr><td colspan="5">موردی یافت نشد</td></tr>';
                return;
            }

        
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
