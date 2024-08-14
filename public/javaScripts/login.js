document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();


    const payload = {

        email: document.querySelector('[name="email"]').value || undefined,
        password: document.querySelector('[name="password"]').value || undefined,
    }


    try {
        const response = await axios.post('/login', { email, password });

        const data = response.data;

        if (response.status === 200) {
            localStorage.setItem('x-token', data.token);
            alert(data.message);
            window.location.href = `/profile`;
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Login error:', error);
        if (error.response) {
            alert(error.response.data.message);
        } else {
            alert('An error occurred during login.');
        }
    }
});
