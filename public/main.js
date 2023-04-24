const update = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')
update.addEventListener('click', _ => {
    const newQuote = document.querySelector('#newQuote').value
    fetch('/quotes', {
        method: 'put',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            name: 'JAMES BOND',
            quote: newQuote
        })
    })
    .then(res => {
        if(res.ok) return res.json()
    })
    .then(response => {
        windown.location.reload(true)
    })
})


deleteButton.addEventListener('click', _ => {
    fetch('/quotes', {
        method: 'delete',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            name: 'JAMES BOND'
        })
    })
    .then(res => {
        if(res.ok) return res.json()
    })
    .then(response => {
        if(response === 'No James bond quote'){
            messageDiv.textContent = 'No James Bond quote to delete'
        }else{
            window.location.reload(true)
        }
    })
})