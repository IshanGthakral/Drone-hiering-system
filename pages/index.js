import { useState, useEffect } from "react";
import { ethers } from "ethers";
import DroneDeliverySystemAbi from "../artifacts/contracts/DroneDeliverySystem.sol/DroneDeliverySystem.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [DroneDeliverySystem, setDroneDeliverySystem] = useState(undefined);
  const [droneAvailability, setDroneAvailability] = useState({});
  const [message, setMessage] = useState("");
  const [droneModel, setDroneModel] = useState("");
  const [droneId, setDroneId] = useState("");

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Update with your contract address
  const DroneDeliverySystemABI = DroneDeliverySystemAbi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const accounts = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(accounts);
    }
  };

  const handleAccount = (accounts) => {
    if (accounts.length > 0) {
      setAccount(accounts[0]);
    } else {
      setAccount(undefined);
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    try {
      const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
      handleAccount(accounts);
      getDroneDeliverySystemContract();
    } catch (error) {
      setMessage("Error connecting account: " + (error.message || error));
    }
  };

  const getDroneDeliverySystemContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const DroneDeliverySystemContract = new ethers.Contract(contractAddress, DroneDeliverySystemABI, signer);
    setDroneDeliverySystem(DroneDeliverySystemContract);
  };

  const addDrone = async () => {
    setMessage("");
    if (DroneDeliverySystem) {
      try {
        let tx = await DroneDeliverySystem.addDrone(droneModel);
        await tx.wait();
        setMessage("Drone added successfully!");
      } catch (error) {
        setMessage("Error adding drone: " + (error.message || error));
      }
    }
  };

  const rentDrone = async () => {
    setMessage("");
    if (DroneDeliverySystem) {
      try {
        let tx = await DroneDeliverySystem.rentDrone(droneId);
        await tx.wait();
        checkDroneAvailability(droneId);
        setMessage("Drone rented successfully!");
      } catch (error) {
        setMessage("Unable to rent drone: " + (error.message || error));
      }
    }
  };

  const returnDrone = async () => {
    setMessage("");
    if (DroneDeliverySystem) {
      try {
        let tx = await DroneDeliverySystem.returnDrone(droneId);
        await tx.wait();
        checkDroneAvailability(droneId);
        setMessage("Drone returned successfully!");
      } catch (error) {
        setMessage("Unable to return drone: " + (error.message || error));
      }
    }
  };

  const checkDroneAvailability = async (droneId) => {
    try {
      if (DroneDeliverySystem) {
        const [droneModel, isRented] = await DroneDeliverySystem.checkDroneAvailability(droneId);
        setDroneAvailability((prev) => ({ ...prev, [droneId]: { droneModel, isRented } }));
      }
    } catch (error) {
      setMessage("Error fetching drone availability: " + (error.message || error));
    }
  };

  const initUser = () => {
    if (!ethWallet) {
      return <p>Please install MetaMask to use this drone delivery system.</p>;
    }

    if (!account) {
      return <button onClick={connectAccount}>Connect MetaMask Wallet</button>;
    }

    return (
      <div>
        <p>Your Account: {account}</p>
        <div className="drone-actions">
          <input
            type="text"
            placeholder="Drone Model"
            value={droneModel}
            onChange={(e) => setDroneModel(e.target.value)}
          />
          <button onClick={addDrone}>Drone model</button>

          <input
            type="text"
            placeholder="Drone ID"
            value={droneId}
            onChange={(e) => setDroneId(e.target.value)}
          />
          <button onClick={rentDrone}>Hire Drone</button>
          <button onClick={returnDrone}>Fire Drone</button>

          <div className="drone-info">
            {Object.keys(droneAvailability).map((droneId) => (
              <div key={droneId}>
                <p>Drone ID: {droneId}</p>
                <p>Model: {droneAvailability[droneId].droneModel}</p>
                <p>Status: {droneAvailability[droneId].isRented ? "Rented" : "Available"}</p>
                
              </div>
            ))}
          </div>
        </div>
        {message && <p><strong>{message}</strong></p>}
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
    <header>
      <h1>Welcome to Drone Hiring System</h1>
    </header>
    {initUser()}
    <style jsx>{`
      .container {
        text-align: center;
        background-color: white;
        color: black; /* Changed text color to white */
        font-family: "Times New Roman", serif;
        border: 10px solid black;
        border-radius: 20px;
        background-image: url("https://i.pinimg.com/originals/34/93/4f/34934ff0d94d085d02e5ceb345ecde66.jpg");
        background-size: cover; /* Ensures the image covers the entire container */
        background-position: center; /* Centers the image */
        background-repeat: no-repeat; /* Prevents the image from repeating */
        height: 850px;
        width: 1500px;
        opacity: 0.9;
        font-weight: 1000;
        padding: 20px;
      }
  
      header {
        padding: 10px;
      }
  
      h1 {
        font-family: "Arial", serif;
        font-size: 60px;
        margin-bottom: 20px;
      }
  
      .drone-info {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }
  
      button {
        background-color: #4caf50;
        color: white;
        border: none;
        padding: 15px 25px; /* Adjusted padding for uniformity */
        font-size: 22px; /* Reduced font size */
        cursor: pointer;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      }
  
      button:hover {
        background-color: #388e3c;
      }
    `}</style>
  </main>
  
  );
}
