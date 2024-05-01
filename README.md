# Welcome to the Jukebox!

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Running the Jukebox

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
The page will reload if you make changes.\

### `npm test`
Launches the test runner in the interactive watch mode.\

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## How does it work?

Thanks for asking! Once upon a time, many moons ago when I was writing my project proposal, this was intended to be written all in C++, have a fresh GUI made in C++ Builder, and have playback controlled by a doubly-linked list with circular behavior that talks with Spotify's Web API. Ah, the naivete of youth. What we have here is, in fact, not that. C++ Builder was zapping me of my patience/will-to-live so everything has now been switched over to a **React application** running on Javascript, CSS, and a touch of HTML. 

The Jukebox does, in fact, successfully integrate Spotify's Web API. All song/album metadata, including album art, release date, and live song playback are accessible and visible in the application. If you have a Spotify account, you are able to log in and both view and play from your saved/created playlists. 

The primary data structure implemented is an **indexed collection of arrays**. For an easy entrypoint to look at the implementation of this data structure, take a look at **audioPlayer.js** (particularly *HandleNext()* and *HandlePrev()*); however, evidence of this structure is present all over. There was, at one point, an attempt to get the audioPlayer up and running off of a doubly-linked list with circular behavior--unfortunately, either the linked list worked or the Spotify API calls worked. C'est la vie. 

## Can I see this so-called Jukebox in action?

Indeed. Enter the Jukebox: *video link goes here*

