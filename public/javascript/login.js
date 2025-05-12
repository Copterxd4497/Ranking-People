const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/users/login',
      data: {
        email,
        password
      }
    });
    console.log(res);
    if (res.status === 200) {
      alert('Login successful!');
      window.location.href = '/'; // Redirect to dashboard or another page
    }
  } catch (err) {
    console.log(err.response?.data || 'An error occurred');
    alert('Login failed. Please check your credentials.');
  }
};

// Ensure the form exists before adding the event listener
const loginForm = document.querySelector('.form');
if (loginForm) {
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    login(email, password);
  });
}

const logoutButton = button => {
  const btn = document.querySelector(button);
  if (!btn) {
    console.warn(`Button with selector "${button}" not found.`);
    return;
  }

  btn.addEventListener('click', async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: 'http://127.0.0.1:3000/api/v1/users/logout'
      });

      if (res.status === 200) {
        location.reload();
      }
    } catch (err) {
      console.error('Logout failed:', err);
      alert('Logout failed. Please try again.');
    }
  });
};

// Initialize logout buttons
logoutButton('.logoutForm');
logoutButton('.FromOverview');
