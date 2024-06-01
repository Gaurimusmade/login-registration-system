import React, { useEffect, useState } from "react";
import "../css/table.css";
import { table } from "../handleHttp/Api";
import { useNavigate } from "react-router-dom";

const Table = () => {
  const token = localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [customersData, setCustomersData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      if (token) {
        try {
          const response = await table(token);
          setCustomersData(response);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Error fetching data:", error);
          setError("An error occurred. Please try again later.");
        } finally {
          setIsLoading(false);
        }
      } else {
        navigate("/login");
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : isAuthenticated ? (
        <div>
          <button onClick={logout}>Logout</button>
          <table id="customers">
            <thead>
              <tr>
                <th>Company</th>
                <th>Contact</th>
                <th>Country</th>
              </tr>
            </thead>
            <tbody>
              {customersData.map((customer, index) => (
                <tr key={index}>
                  <td>{customer.company}</td>
                  <td>{customer.contact}</td>
                  <td>{customer.country}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>You are not authenticated. Please log in.</p>
      )}
    </div>
  );
};

export default Table;
