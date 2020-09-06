const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const fullLocation = document.querySelector('#location')
const temperature = document.querySelector('#temperature')
const description = document.querySelector('#description')
const temp_min = document.querySelector('#temp_min')
const temp_max = document.querySelector('#temp_max')
const address = document.querySelector('#address')

weatherForm.addEventListener('submit', (e) => {

    e.preventDefault()

    messageOne.textContent = 'Loading...'
    fullLocation.textContent = ''
    temperature.textContent = ''
    description.textContent = ''
    temp_min.textContent = ''
    temp_max.textContent = ''
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
                temperature.textContent = 'Temperature: ' + data.temperature + ' \xB0C'
                description.textContent = 'Description: ' + data.description
                temp_min.textContent = 'Minimum Temerature: ' + data.temp_min + ' \xB0C'
                temp_max.textContent = 'Maximum Temerature: ' + data.temp_max + ' \xB0C'
                address.textContent = 'Address: ' + data.address
            }
        })
    })
})