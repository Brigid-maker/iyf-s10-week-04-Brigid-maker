<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Calculator</title>
</head>
<body>

    <h1>Simple Calculator</h1>

    <!-- Inputs -->
    <input id="num1" type="number" placeholder="First number">
    <input id="operator" type="text" placeholder="+ - * / % **">
    <input id="num2" type="number" placeholder="Second number">

    <br><br>

    <!-- Button -->
    <button onclick="runCalc()">Calculate</button>

    <!-- Result -->
    <h2 id="result">Result will appear here</h2>

    <script src="main.js"></script>

</body>
</html>