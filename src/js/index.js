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


document.getElementById('priceSortIcon').addEventListener('click', function() {
    sortTableBy('price', this);
});

document.getElementById('dateSortIcon').addEventListener('click', function() {
    sortTableBy('date', this);
});

function sortTableBy(field, iconElement) {
    const apiUrl = `http://localhost:3000/transactions?sort=price`; 

    axios.get(apiUrl)
    .then(response => {
        let data = response.data;
        const tableBody = document.querySelector('#dataTable tbody');
        tableBody.innerHTML = ''; 


        if (iconElement.classList.contains('rotated')) {
        
            data.sort((a, b) => field === 'price' ? b.price - a.price : new Date(b.date) - new Date(a.date));
            iconElement.classList.remove('rotated');
        } else {
    
            data.sort((a, b) => field === 'price' ? a.price - b.price : new Date(a.date) - new Date(b.date));
            iconElement.classList.add('rotated');
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
}

