# own-Server

This is a simple Node.js server built for practice purposes.
It serves two main pages:

🏠 Home Page

🔐 Login Page (with basic login form handling)

#features
. Serves static index.html for the home route (/)
. Serves a login form (/login - GET request)
. Handles login form submission (/login - POST request)
. Validates user credentials
. Uses Node.js core modules: http, fs, path, querystring
. Uses Streams (fs.createReadStream) to serve files

