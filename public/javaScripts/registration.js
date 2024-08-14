const form = document.querySelector('#registration')
form.onsubmit = async (e) => {
    e.preventDefault();

    const payload = {
        firstName: document.querySelector('[name="firstName"]').value || undefined,
        lastName: document.querySelector('[name="lastName"]').value || undefined,
        email: document.querySelector('[name="email"]').value || undefined,
        password: document.querySelector('[name="password"]').value || undefined,
    }

    const data = await axios({
        method: 'post',
        url: '/register',
        data: payload

    })
        .then(({data}) => {
            return {
                error: false,
                result: data
            }
        })
        .catch((e) => {
            return {
                error: true,
                result: e.response.data
            }
        });
    const keys = Object.keys(payload)
    const errors = data.result

    if (data.error) {
        keys.forEach((key) => {
            document.querySelector(`span[data-name="${key}"]`).innerText = errors[key] || '';
        })
    } else {
        keys.forEach((key) => {
            document.querySelector(`span[data-name="${key}"]`).innerText = errors[key] || '';
        })
        console.log(errors.newUser)
        document.querySelector('#message').innerText = 'Registration successful';
        document.querySelector('#message_2').innerText = JSON.stringify(errors.newUser, null, 2);
    }
}