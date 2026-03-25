# API Hunter

This project provides a tool for storing data in json-server and display it in web page using "POST".

# Installation

You must run ```yarn install``` to install all the dependencies

# json-server

Start the json-server using ```yarn run json-server --watch db.json``` inside the root folder of this project.

# Start the Web Server

Type ```yarn run dev``` and then press enter. Then type ```o``` and then press enter.

# Modules

<img width="1440" height="772" alt="Screenshot 2026-03-25 at 5 32 45 PM" src="https://github.com/user-attachments/assets/1330a070-3173-45fb-af1e-f4abe6419bbd" />

This displays all the data already being added. The first time load (when web page loads) uses ```axios``` to load all data, and the refresh button actually uses ```fetch()``` to refresh all the data. It is not automatic and you must refresh everytime you add data. Select the "GET" option from the module dropdown to choose this.

<hr/>

<img width="1440" height="772" alt="Screenshot 2026-03-25 at 5 32 58 PM" src="https://github.com/user-attachments/assets/1ebeb0df-4e81-4967-9a21-c691d9e88689" />

This is the form for adding new user. Now it provides two ways to add data, using ```fetch()``` and using ```axios```. Select any of it as you want. Select the "POST" option from the module dropdown to choose this.
