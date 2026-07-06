# Trade Tracker -- WORK IN PROGRESS

Do you enjoy gambling away your entire financial future on random stocks and other risky, short-term financial products? Just kidding, don't do that. INSTEAD, before 
you spend real money, track how well your strategies do with the Trade Tracker. If you are already spending all of your money, at least keep track of it to make sure 
you know how well you're doing. 

#ACTUALLY ADD VIDEO OF IT WORKING HERE ONCE SETUP FULLY 

## Table of Contents

- [Why Make It?](#why-make-it)
- [Properties](#properties)
- [Setup](#setup)
- [Using the Trade Tracker](#using-the-trade-tracker)
- [Current Version](current-version)

### Why Make It?

- I wanted to learn how to use databases and switch out my data whenever I wanted to, which led me to creating a pywebview app.

- The reasoning is twofold: 1. Sometimes I like to see if my prediction of a stock/etc. movement is correct, but I like to group my guesses based off of the idea/strategy that I had at the time. Most trade journals cost money and/or don't allow that sort of customization. As such, individually calculating statistics for everything individually is a pain. 


### Properties
- Tech-wise:
    - This is a pywebview app, turned into an exe using pyinstaller. It uses HTML/JS/CSS for the frontend and python to connect to sqlite database files.
    - users can add/delete strategies that will be dynamically loaded when the page loads. Users can also select which sections they want to see (like if they don't want to see "length" they don't have to. 
- For the User:
    - Everything is local, no signups, no passwords, no wifi needed. 
    - Can quickly switch out any data file that you had made (for example, switch out 2025.db for 2026.db).
    - Your favorite file and visibility settings are remembered every time so you can see what you want.
    - You can add/delete custom strategies so you can keep track of what matters to you.
    - Can quickly insert, edit, delete, and load any trades that have been made on different timeframes.
    - Statistics are quickly loaded to compare your totals to specific strategies and more.

### Setup

1. I will make a way to install it eventually, right now it would likely be in the finished folder in the repo above.
2. Open the folder with the version that you want. Download the .zip inside.
3. Extract the .zip file and move it where you would like on your computer.
4. Double click on the .exe to open the program. When you do, at the top it would likely show "File: " or a file that says something like "noDB.db". No files can be saved yet. Click on the link that says "New File".
5. Go through the settings that are shown on the New File page. If you don't know what to change, you can leave it as is. At the bottom, create a new file name (like "2026" or "March"). Click the button to pick where you want your new file to go, and click "Create New File"
6. You may need to hit ctrl + r for the change to take effect (the file should be connected when your new file path is shown at the top. Go back to the homepage.
7. On the right there is a section that says, "Add Trade". Fill out as much information as you can can (at least pl and date) and hit "Save Trade". If a trade shows up on the left your file has been created successfully and everything works.

### Using The Trade Tracker

Not going over all of this since I'm lazy but here goes some of it:

- Top Bar: The top bar shoes what file is your current favorite (if it doesn't show a file path, click on it to click a correct file and refresh the page). It also shows the date, an emoji to show how well you are doing (from smily face to sad face), the profit/loss of all data in your file, and your win ratio of all of the data in your file. Underneath are your links to the other sections.
- Home Page:
    - The "Rules" section are to remind you of rules you have for yourself, like "No penny stocks". Change these in the Settings tab. Underneath shows the trades you have.
    - When there are trades to be loaded for the day/week, you can delete/edit using the corresponding buttons. Hovering over the epxlanation increases the box size and double-clicking expands all photos used. The plain number shows how many contracts you used to buy something, the plain letter shows your rating for that trade (like A, B, C, etc.). If the trade uses your custom strategy, it will have the word and color on the trade (only if you have quickShow on, see settings for that).
    - the right is where you add trades. For photos you can paste text/images from your clipboard straight into the pic boxes. You cannot upload photos and this is unnofficial, but it's faster and you want faster.
    - The Extra notes section allows you to put a photo or something in the meantime in an emergency. If you edit/delete/change file it will be deleted but if you save a trade it should stick around. Select photos like you would text and hit backspace if you want to delete them, and double-click the overall box to enlarge them. 
-Stat/Chart Page:
    - This is still a work in progress, but for most things you should be able to select most of the variables below (other than allStat, customDate, dayofweek) and when you hit "Calculate Stats" it creates a chart column for each variable you selected. Eventually it will compare data from past files to it so you can see how you compare to other files, but not yet.
-All Trades:
    - This is a bit slow right now, I don't have time to fix it. This loads all trades on the total file. Eventually you should be able to choose which types of trades you would like to see.
-Past Data/New File/Tutorial:
    - This section is non-functional yet, still trying to connect past data to current files
- About/Release Notes:
    - a long winded answer to what has been done so far and updates. (it should work right now)
     
### Current Version 

Trade Tracker 1.0.0 (6/8/26) -> 

This is the first version of trade tracker. Very few things work right now and it's very buggy. You should be able to create/find files add/delete/edit/load trades, and get stats only for all trades at the moment. 1.1.0 will fix a lot of those issues right now but not going to add it in until I get a few of them all solved at once because they are all interconnected. 



