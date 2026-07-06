import PyInstaller.__main__

#REMEMBER TO TURN OFF THE DEBUG BUT ALLOW REFRESHING SETTING IN MAINTT.PY
PyInstaller.__main__.run([
    'tt2.py',

    '--add-data',
    'tt2.js:.',

    '--add-data',
    'tt2.html;.',

    '--add-data',
    'tt.css;.',

    '--add-data',
    'statChart.html;.',

    '--add-data',
    'statChart.js;.',

    '--add-data',
    'allTrades.html;.',

    '--add-data',
    'allTrades.js;.',

    '--add-data',
    'settings.html;.',

    '--add-data',
    'settings.js;.',

    '--add-data',
    'newFile.html;.',

    '--add-data',
    'images/editClearBackground.png;.',

    '--add-data',
    'images/checkmark.png;.',

    '--add-data',
    'images/xMark.png;.',

    '--add-data',
    'about.html;.',

    '--add-data',
    'pastData.html;.',

    '--add-data',
    'images/favicon.ico;.',

    '--onefile',
    '--noconsole'
])
#-i = icon
#need to make it into onefiel for it to work. the settings file needs to be elsewhere
#also need to start out with a  file in the settings, or else it wont work
