document.getElementById("login-btn").addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  console.log("Login clicked", email, password);

  // Later: call Supabase auth here
  document.getElementById("status").innerText = "Logged in (MVP placeholder)";
});
