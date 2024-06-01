const register = async (user, setUser) => {
  try {
    const res = await fetch("http://localhost:5001/user/register", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      const data = await res.json();
      const { token } = data;
      localStorage.setItem("token", token);
      setUser(user);
    } else {
      console.error("Failed to register user.");
    }
    return res;
  } catch (error) {
    console.error("Error:", error);
  }
};

const login = async (user, setUser) => {
  try {
    const res = await fetch("http://localhost:5001/user/login", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const data = await res.json();
      const { token } = data;
      localStorage.setItem("token", token);
      setUser(user);
    }
  } catch (err) {
    console.log("Error:", err);
  }
};

const table = async (token) => {
  try {
    const res = await fetch("http://localhost:5001/user/details", {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      const data = await res.json();
      const { customersData } = data;
      return customersData;
    } else {
      throw new Error(`Error fetching data: ${res.status}`);
    }
  } catch (err) {
    console.log("Error:", err);
  }
};

export { register, login, table };
