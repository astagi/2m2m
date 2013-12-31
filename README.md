2m2m
====
2m2m (2 minutes 2 midnight) is a simple Node.js app created to provide an alternative way to wait for the new year!

Motivation
----------
This is my first Node project. While you're listening to your music (and eventually dancing) you can keep this app running on your TV using a PC or a Raspberry. 

This app is a simple carousel with a countdown, everyone during the party can upload a photo and send a message to display. You can attach a Leap Motion and stop the carousel passing a hand on it.

Do I have a lot of time to waste? NO! I just wanted to learn Node and all the other new cool things for frontend development :)

What you need
-------------
First of all you need Grunt
```
npm install -g grunt
```
Then you need imagemagick installed in your system, for instance if you're on OS X you can use Homebrew
```
brew install imagemagick
```
Finally you need to install the required node modules, then run
```
npm install
```

How to use
----------
Upload your photo in the /photo folder then run
```
grunt resize
```
then launch the server
```
node app.js
```
Now you can attach your PC or RaspberryPi to your TV and open the browser to http://localhost:3000/ entering "presentation mode".

The other guys can upload photos going to
```
http://yourserverip:3000/photos/upload
```
and send a message at:
```
http://yourserverip:3000/messages/upload
```

How to contribute
-----------------
This is my first app using Node.js, the first time I use AngularJS and Grunt. Be patient and contribute :)