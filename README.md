# CM20314-cf-shopping-app
Year 2 Semester 1 and 2 - Carbon Footprint Receipt Scanner App

## Getting Started
Install NPM and Node JS following the tutorial https://www.youtube.com/watch?v=X-FPCwZFU_8&t=200s&ab_channel=TechMeSpot 

After cloning the repo, cd into the root file and run
```
npm install
```
to install the dependencies.

To run the app (while testing), download Expo Go from https://expo.dev/client, cd into the root file and run
```
npx expo start
```
A QR code will appear in the terminal, scan it with your phone camera and it will open in Expo Go and will show realtime updates to the app.

If you are on a mac, run
```
npx expo start --ios
```
and the app will run on the Xcode simulator.

## Project Structure
App.js is the root of the file. It should only contain navigation tools for the app.
When creating a new screen, create it in /src/screens.
If you find you are reusing a component a lot, place it in /src/components in a new <component-name>.js file and import it where you need.

## Remember
1. To create a new branch and name it appropriately with the Jira Issue Key
2. Commit with the Jira Issue Key in the commit message, with an appropriate message
3. Refer to **https://experimental-systems-group20.atlassian.net/wiki/spaces/EP/pages/17334274/Using+Git+and+BitBucket?atlOrigin=eyJpIjoiMDA5MDg1MWEwNTYwNDU4MWFmNWZlNjg4ZWFhODEzYmIiLCJwIjoiaiJ9** for branches and commits
  
## Project Documents
- React Native Wind for CSS, the documentation can be found at https://reactnativewind.com/docs/intro
- React Native SVG Charts for charting and infographics, the documentation can be found at https://github.com/JesperLekland/react-native-svg-charts
