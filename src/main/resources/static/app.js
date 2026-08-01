const API_BASE = "http://localhost:8080/api";

function toggleForms() {
  const loginBox = document.getElementById("login-box");
  const signupBox = document.getElementById("signup-box");
  if (loginBox.style.display === "none") {
    loginBox.style.display = "block";
    signupBox.style.display = "none";
  } else {
    loginBox.style.display = "none";
    signupBox.style.display = "block";
  }
}

async function handleSignup() {
  const user = document.getElementById("signup-user").value;
  const pass = document.getElementById("signup-pass").value;

  try {
    const response = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: user, password: pass }),
    });

    if (response.ok) {
      document.getElementById("signup-error").innerText = "";
      document.getElementById("signup-msg").innerText =
        "Registration complete! You can log in.";
    } else {
      const errorMsg = await response.text();
      document.getElementById("signup-error").innerText = errorMsg;
    }
  } catch (err) {
    document.getElementById("signup-error").innerText =
      "Server connection lost.";
  }
}

async function handleLogin() {
  const user = document.getElementById("login-user").value;
  const pass = document.getElementById("login-pass").value;

  try {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: user, password: pass }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("jwt_token", data.token);
      window.location.href = "dashboard.html";
    } else {
      document.getElementById("login-error").innerText =
        "Invalid username or password.";
    }
  } catch (err) {
    document.getElementById("login-error").innerText =
      "Server connection lost.";
  }
}

async function verifyDashboardAccess() {
  const token = localStorage.getItem("jwt_token");
  if (!token) {
    window.location.href = "index.html";
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/dashboard`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
      const message = await response.text();
      document.getElementById("welcome-message").innerText = message;
    } else {
      handleLogout();
    }
  } catch (err) {
    document.getElementById("welcome-message").innerText =
      "Authentication runtime error.";
  }
}

function handleLogout() {
  localStorage.removeItem("jwt_token");
  window.location.href = "index.html";
}
