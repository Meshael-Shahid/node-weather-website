const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const fullLocation = document.querySelector('#location')
const temperature = document.querySelector('#temperature')
const visibility = document.querySelector('#visibility')
const address = document.querySelector('#address')

weatherForm.addEventListener('submit', (e) => {

    e.preventDefault()

    messageOne.textContent = 'Loading...'
    fullLocation.textContent = ''
    temperature.textContent = ''
    visibility.textContent = ''
    address.textContent = ''

    const location = search.value
    const url = '/weather?address=' + location
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = ''
                fullLocation.textContent = 'Location: ' + data.location
                temperature.textContent = 'Temperature: ' + data.temperature
                visibility.textContent = 'Visibility: ' + data.visibility
                address.textContent = 'Address: ' + data.address
            }
        })
    })
})