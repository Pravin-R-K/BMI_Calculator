import React, { useState } from "react";
import bmiImage from "./assets/bmiImage.png";
import { toast, ToastContainer } from "react-toastify";

const App = () => {
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [bmi, setBmi] = useState(null);
    const [status, setStatus] = useState("");

    const validate = (e) => {
        e.preventDefault();

        if (height == null || weight == null) {
            toast.error("Please fill the fields!");
        } else {
            calculateBmi();
        }
    };

    const calculateBmi = () => {
        const isValidHeight = /^\d+$/.test(height);
        const isValidWeight = /^\d+$/.test(weight);

        if (isValidHeight && isValidWeight) {
            const heightInMeters = height / 100;
            const bmiValue = weight / (heightInMeters * heightInMeters);
            setBmi(bmiValue.toFixed(2));
            if (bmiValue < 18.5) {
                setStatus("Underweight");
            } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
                setStatus("Normal Weight");
            } else if (bmiValue >= 25 && bmiValue < 29.9) {
                setStatus("Overweight");
            } else {
                setStatus("Obese");
            }
        } else {
            setBmi(null);
            setStatus("");
        }
    };

    const clearAll = () => {
        setHeight("");
        setWeight("");
        setBmi(null);
        setStatus("");
    };

    return (
        <div className="bmi-container flex">
            <ToastContainer autoClose={2000} theme="dark" />
            <div className="img flex f-center">
                <img src={bmiImage} width="350" />
            </div>
            <form onSubmit={validate} className="data">
                <h1>
                    <span className="b">B</span>
                    <span className="m">M</span>
                    <span className="i">I</span> CALCULATOR
                </h1>
                <div className="inp">
                    <label>
                        Height: <span>(in cm)</span>
                    </label>
                    <input
                        type="number"
                        value={height}
                        placeholder="0"
                        onChange={(e) => {
                            setHeight(e.target.value);
                        }}
                    />
                </div>
                <div className="inp">
                    <label>
                        Weight: <span>(in kg)</span>
                    </label>
                    <input
                        type="number"
                        value={weight}
                        placeholder="0"
                        onChange={(e) => {
                            setWeight(e.target.value);
                        }}
                    />
                </div>
                <button onClick={calculateBmi}>Calculate BMI</button>
                <button className="clear" onClick={clearAll}>
                    Clear
                </button>
                {bmi !== null && (
                    <div className="result">
                        <p>Your BMI is: {bmi}</p>
                        <p>Status: {status}</p>
                    </div>
                )}
            </form>
        </div>
    );
};

export default App;
