import webview
import sqlite3
import time
import shutil
import os
import datetime as dt #gives it a different name (could be anything)

class Api:
    def saveFolderLocation(self, fileType, activeButton):
        if (fileType == 'folder'):
            result = window.create_file_dialog(dialog_type=webview.FileDialog.FOLDER)
        elif (fileType == 'file'):
            file_types = ('Database Files (*.db)', 'All files (*.*)')
            result =   window.create_file_dialog(webview.FileDialog.OPEN, allow_multiple=False, file_types = file_types)
        return (result, activeButton)
    def newCustom(self, name, hidden, quickShow, color):
        try:
            print('ADDING NEW CUSTOM TO DB')
            sqliteConnection = sqlite3.connect('settings.db')
            cursor = sqliteConnection.cursor()
            cursor.execute('INSERT INTO User_DB_Structure (data_name, editable, hideable, hidden, quick_show, color, sql_datatype) VALUES (?, ?, ?, ?, ?, ?, ?)', [name, 'Y', 'Y', hidden, quickShow, color, 'INTEGER'])
            sqliteConnection.commit()
        except sqlite3.Error as error:
             print('Error occurred- ', error)
        finally:
            if sqliteConnection:
                sqliteConnection.close()
    def deleteCustom(self, name):
        try:
            sqliteConnection = sqlite3.connect('settings.db')
            cursor = sqliteConnection.cursor()
            cursor.execute("DELETE FROM User_DB_Structure WHERE data_name = ?", [name])
            sqliteConnection.commit()
        except sqlite3.Error as error:
             print('Error occurred- ', error)
        finally:
            if sqliteConnection:
                sqliteConnection.close()
    def changeCustomSetting(self, nameVal, hiddenVal, quickShowVal, colorVal):
        try:
            sqliteConnection = sqlite3.connect('settings.db')
            cursor = sqliteConnection.cursor()
            sqlPhrase = str('UPDATE User_Db_Structure SET hidden = \'' + hiddenVal + '\', quick_show = \'' + quickShowVal + '\', color = \''+ colorVal + '\' WHERE data_name = \'' + nameVal + '\'')
            print('SQL PHRASE ', sqlPhrase)
            #cursor.execute('UPDATE User_DB_Structure SET ? = ? WHERE data_name = ?', [dataType, changeValue, name])
            cursor.execute(sqlPhrase)
            sqliteConnection.commit()
        except sqlite3.Error as error:
             print('Error occurred- ', error)
        finally:
            if sqliteConnection:
                sqliteConnection.close()
    def changeSetting(self, dataType, name, prevValue, changeValue):
        try:
            sqliteConnection = sqlite3.connect('settings.db')
            cursor = sqliteConnection.cursor()
            sqlPhrase = str('UPDATE User_Db_Structure SET '+ dataType+ ' = \''+ changeValue+ '\' WHERE data_name = \''+ name + '\'')
            print('SQL PHRASE ', sqlPhrase)
            #cursor.execute('UPDATE User_DB_Structure SET ? = ? WHERE data_name = ?', [dataType, changeValue, name])
            cursor.execute(sqlPhrase)
            sqliteConnection.commit()
        except sqlite3.Error as error:
             print('Error occurred- ', error)
        finally:
            if sqliteConnection:
                sqliteConnection.close()
    def settingList(self):
        try:
            sqliteConnection = sqlite3.connect('settings.db')
            cursor = sqliteConnection.cursor()
            cursor.execute('SELECT data_name, editable, hideable, hidden, quick_show, color FROM User_DB_Structure')
            result = cursor.fetchall()
            return result
        except sqlite3.Error as error:
             print('Error occurred- ', error)
        finally:
            if sqliteConnection:
                sqliteConnection.close()
    def loadNotifications(self):
        try:
            sqliteConnection = sqlite3.connect('settings.db')
            cursor = sqliteConnection.cursor()
            cursor.execute('SELECT * FROM User_Notifications')
            result = cursor.fetchall()
            return result
        except sqlite3.Error as error:
             print('Error occurred- ', error)
        finally:
            if sqliteConnection:
                sqliteConnection.close()
    def saveNotification(self, text, color):
        try:
            sqliteConnection = sqlite3.connect('settings.db')
            cursor = sqliteConnection.cursor()
            cursor.execute('INSERT INTO User_Notifications (Notification_Text, Color) VAlUES(?,?)', [text, color])
            sqliteConnection.commit()
            return
        except sqlite3.Error as error:
             print('Error occurred- ', error)
        finally:
            if sqliteConnection:
                sqliteConnection.close()
    def deleteNotification(self, text):
        try:
             sqliteConnection= sqlite3.connect('settings.db')
             cursor = sqliteConnection.cursor()

             cursor.execute("DELETE FROM User_Notifications WHERE id = ?", [text])
             sqliteConnection.commit()
             return 
        except sqlite3.Error as error:
             print('Error occurred- ', error)
        finally:
            if sqliteConnection:
                print('trades deleted. ending connection')
                sqliteConnection.close()
    def openFileExplorer(self):
        file_types = ('Database Files (*.db)', 'All files (*.*)')
        result =   window.create_file_dialog(webview.FileDialog.OPEN, allow_multiple=False, file_types = file_types)
        fileName = str(result[0])
        #print(result[0])
        self.saveFavoriteFile(fileName)
        return
    def saveFavoriteFile(self, data):
            try:
                sqliteConnection = sqlite3.connect('settings.db')
                cursor = sqliteConnection.cursor()
                print('DB Connected: saving new favorite file')
                cursor.execute('SELECT * FROM Settings WHERE User = "Personal"')
                cursor.execute('REPLACE INTO Settings (User, Preferred_File) VALUES (?, ?)', ["Personal", data])
                sqliteConnection.commit()
                result = cursor.fetchall()
                return result
            except sqlite3.Error as error:
                print('Error occurred: ', error)
            finally:
                if sqliteConnection:
                    sqliteConnection.close()
                    print('cursor connection closed')
    def userSettings(self):
        try:
             sqliteConnection= sqlite3.connect('settings.db')
             cursor = sqliteConnection.cursor()
             #print('DB Connected: load userSEttings')
             query_list = ["SELECT data_name from User_DB_Structure WHERE editable = 'Y'", "SELECT data_name from User_DB_Structure WHERE hideable = 'Y'", "SELECT data_name from User_DB_Structure WHERE hidden = 'Y'", "SELECT data_name from User_DB_Structure WHERE quick_show = 'Y'"]
             query_response = []
             #cursor.execute(query_list[0])
             #cursor.execute("SELECT * FROM Trades WHERE date = ?", [date])
             for x in query_list:
                 cursor.execute(query_list[query_list.index(x)])
                 result = cursor.fetchall()
                 cleaned_result = []
                 for x in result:
                     cleaned_result.append(x[0])
                 query_response.append(cleaned_result)
             return query_response

        except sqlite3.Error as error:
             print('Error occurred- ', error)
        finally:
            if sqliteConnection:
                #print('userSettings loaded. ending connection')
                sqliteConnection.close()
    def customColor(self):
        try:
             sqliteConnection= sqlite3.connect('settings.db')
             cursor = sqliteConnection.cursor()
             #print('DB Connected: load customColors')
             cursor.execute("SELECT data_name, color FROM User_DB_Structure WHERE color != ''")
             result = cursor.fetchall()
             return result


        except sqlite3.Error as error:
             print('Error occurred- ', error)
        finally:
            if sqliteConnection:
                #print('colors loaded. ending connection')
                sqliteConnection.close()
    def miniStats(self, tableName) :
        if (os.path.isfile(tableName)):
            try:
                sqliteConnection= sqlite3.connect(tableName)
                cursor = sqliteConnection.cursor()
                # print('DB Connected: load miniStats')

                cursor.execute("SELECT pl FROM Trades")
                result = cursor.fetchall()
                pl_data = []
                pl_added = []
                data_ww = []
                data_loss_num = 0
                for x in result:
                    pl_data.append(x[0])
                for x in pl_data:
                    if x < 0:
                        data_loss_num += 1
                if str(len(pl_data)) == 0:
                    data_ww = 0
                    # print(len(pl_data))
                    # print(str(len(pl_data)))
                    return data_ww
                elif len(pl_data) > 0: 
                    data_ww = round(100 * ((len(pl_data) - data_loss_num) / len(pl_data)), 2)
                else:
                    print('0 trades found')
                    data_ww = 0
                pl_added = sum(pl_data)
                sqliteConnection.close()

                customLengthConnection = sqlite3.connect(tableName)
                customCursor = customLengthConnection.cursor()
                #customCursor.execute('SELECT * FROM TRADES')
                customCursor.execute('SELECT sql FROM sqlite_master WHERE name = "Trades"')
                customResult = customCursor.fetchone()
                customLength = customResult[0][272:-35]
                customArray = customLength.split(',')
                currentCustomList = []
                for x in customArray:
                    currentCustomList.append(x[:-7])
                return [pl_added, data_ww, currentCustomList]
            except sqlite3.Error as error:
                print('Error occurred- ', error)
            finally:
                if sqliteConnection:
                    print('miniStats loaded. ending connection')
                    sqliteConnection.close()
    def loadSettings(self):
        try:
             sqliteConnection= sqlite3.connect('settings.db')
             cursor = sqliteConnection.cursor()
             print('DB Connected: load settings')

             cursor.execute("SELECT * FROM Settings")
             result = cursor.fetchall()
             if result[1][1] == "":

                return "No File Chosen:"
             else:
                user_setting_result = self.userSettings()
                mini_stat_result = self.miniStats(result[1][1])
                color_result = self.customColor()
                #result order: fileName, pl-Added, WW:, editable, hideable, hidden, quickShow, color, I'd labale them but it wouldn't let me so oh well
                export_settings = [result[1][1], mini_stat_result[0], mini_stat_result[1], user_setting_result[0], user_setting_result[1], user_setting_result[2], user_setting_result[3], color_result, mini_stat_result[2]]
                return export_settings
        except sqlite3.Error as error:
             print('Error occurred- ', error)
        finally:
            if sqliteConnection:
                print('settings loaded. ending connection')
                sqliteConnection.close()
    def loadTradesToday(self, file, date):
        if (os.path.isfile(file)):
            try:
                sqliteConnection= sqlite3.connect(file)
                cursor = sqliteConnection.cursor()
                print('load trades today')

                cursor.execute("SELECT * FROM Trades WHERE date = ?", [date])
                result = cursor.fetchall()
                return result
            except sqlite3.Error as error:
                print('Error occurred- ', error)
            finally:
                if sqliteConnection:
                    #print('trades loaded. ending connection')
                    sqliteConnection.close()
    def loadTradesWeek(self, file, dateRange): 
            if (dateRange[1] == 'N') & (os.path.isfile(file)):
                try:
                    sqliteConnection= sqlite3.connect(file)
                    cursor = sqliteConnection.cursor()
                    print('load week trades')
                    #cursor.execute("SELECT * FROM Trades WHERE date BETWEEN '2026-04-22' AND '2026-04-23' ")
                    #cursor.execute("SELECT * FROM Trades WHERE date BETWEEN ? and ?", [dateRange[0], dateRange[3]])
                    cursor.execute("SELECT * FROM Trades WHERE date BETWEEN ? AND ? ORDER BY date", [dateRange[0], dateRange[3]])
                    result = cursor.fetchall()
                    return result
                except sqlite3.Error as error:
                    print('Error occurred- ', error)
                finally:
                    if sqliteConnection:
                       # print('loaded weekly trades. ending connection')
                        sqliteConnection.close()

            else :
              print('nothinghas changed')
              #sqlite>SELECT * FROM emp_master WHERE emp_id BETWEEN 1 AND 3;
    def saveTrade(self, file, plVal, dateVal, tradeStartVal, tradeLengthVal, explanationVal, contractVal, dteVal, selectGradeVal, buySell,
        pic1, pic2, pic3, pic4, customNames, customVal): 
        if (os.path.isfile(file)):
            try: 
              sqliteConnection = sqlite3.connect(file)
              cursor = sqliteConnection.cursor()
              dbParameters = ['pl', 'date', 'trade_start', 'trade_length', 'explanation', 'contracts', 'dte', 'rating', 'buySell', 'pic1', 'pic2', 'pic3', 'pic4']
              dbData = [plVal, dateVal, tradeStartVal, tradeLengthVal, explanationVal, contractVal,dteVal, selectGradeVal, buySell, pic1, pic2, pic3, pic4]
              for x in customNames:
                  dbParameters.append(x)
              for x in customVal:
                  dbData.append(x)
              finalValueLength = ("?," * len(dbParameters))[:-1]
              finaldbParameters = ""
              for x in dbParameters:
                  finaldbParameters = finaldbParameters +x + ", "
              finaldbData = ""
              for x in dbData:
                finaldbData = finaldbData + '"'+ x + '", '
              sqlCode = 'INSERT INTO Trades('+ finaldbParameters[:-2]+ ') VALUES (' + finalValueLength+ ')'
              cursor.execute(sqlCode, dbData)
              sqliteConnection.commit()
              #cursor.execute("INSERT INTO Trades(pl, date, trade_start, trade_length, explanation, contracts, dte, rating, buySell, pic1, pic2, pic3, pic4, countertrend, confirmation, chased, cut_short ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", (plVal, dateVal, tradeStartVal, tradeLengthVal, explanationVal, contractVal, dteVal, selectGradeVal, buySell, countertrendVal, confirmationVal, chasedVal, cutShortVal, pic1, pic2, pic3, pic4))
              response = "Trade Was Saved"
              print(response)
              return response
            except sqlite3.Error as error:
                    print('Error occurred -', error)
            finally:
                    if sqliteConnection:
                        print('SQL connection should be closed now')
                        sqliteConnection.close()
    def deleteTrade(self,file,  tradeId) :
        try:
             sqliteConnection= sqlite3.connect(file)
             cursor = sqliteConnection.cursor()
             print('DB Connected: deleting trade', tradeId)

             cursor.execute("DELETE FROM Trades WHERE id = ?", [tradeId])
             sqliteConnection.commit()
             return 
        except sqlite3.Error as error:
             print('Error occurred- ', error)
        finally:
            if sqliteConnection:
                print('trades deleted. ending connection')
                sqliteConnection.close()
    def loadEditTrade(self, file, idVal):
        try:
            sqliteConnection = sqlite3.connect(file)
            cursor = sqliteConnection.cursor()
            print('Load edit trade')

            cursor.execute("SELECT * FROM Trades WHERE id = ?", [int(idVal)])
            result = cursor.fetchall()
            return result
        except sqlite3.Error as error:
            print('Error occurred- ', error)
        finally: 
            if sqliteConnection:
                #print('cursor connection closed')
                sqliteConnection.close()
    def saveEditTrade(self,file, currentId, data, customNames, customVal):
        try:
            sqliteConnection= sqlite3.connect(file)
            cursor = sqliteConnection.cursor()
            print('Editing Trade')
            dbParameters = ['id', 'pl', 'date', 'trade_start', 'trade_length', 'explanation', 'contracts', 'dte', 'rating', 'buySell', 'pic1', 'pic2', 'pic3', 'pic4']
            dbData = [currentId, data[0], data[1], data[2], data[3], data[4], data[5], data[6], data[7], data[8], data[9], data[10], data[11], data[12]]
            for x in customNames:
                dbParameters.append(x)
            for x in customVal:
                dbData.append(x)
            finalValueLength = ("?," * len(dbParameters))[:-1]
            finaldbParameters = ""
            for x in dbParameters:
                finaldbParameters = finaldbParameters +x + ", "
            finaldbData = ""
            for x in dbData:
                finaldbData = finaldbData + '"'+ x + '", '
            sqlCode = 'REPLACE INTO Trades('+ finaldbParameters[:-2]+ ') VALUES (' + finalValueLength+ ')'
            print(sqlCode, dbData)
            cursor.execute(sqlCode, dbData)
            sqliteConnection.commit()
            #cursor.execute("INSERT INTO Trades(pl, date, trade_start, trade_length, explanation, contracts, dte, rating, buySell, pic1, pic2, pic3, pic4, countertrend, confirmation, chased, cut_short ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", (plVal, dateVal, tradeStartVal, tradeLengthVal, explanationVal, contractVal, dteVal, selectGradeVal, buySell, countertrendVal, confirmationVal, chasedVal, cutShortVal, pic1, pic2, pic3, pic4))
            # cursor.execute("REPLACE INTO Trades (id, pl, date, trade_start, trade_length, explanation, contracts, dte, rating, buySell, countertrend, confirmation, chased, cut_short, pic1, pic2, pic2, pic4) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", (idVal, newTradeValues[0], newTradeValues[1], newTradeValues[2], newTradeValues[3], newTradeValues[4], newTradeValues[5], newTradeValues[6], newTradeValues[7], newTradeValues[8], newTradeValues[9], newTradeValues[10], newTradeValues[11], newTradeValues[12], newTradeValues[13], newTradeValues[14], newTradeValues[15], newTradeValues[16]))
            sqliteConnection.commit()
            result = cursor.fetchall()
            return result
        except sqlite3.Error as error:
            print('Error occurred-', error)
            return error
        finally:
            if sqliteConnection:
                print('cursor connection closed')
                sqliteConnection.close()
            return "done"
    def loadTrades(self, file, singleMulti, dateRange, selectSymbol):
        if (os.path.isfile(file)):
            try:
                start = time.time()
                sqliteConnection= sqlite3.connect(file)
                cursor = sqliteConnection.cursor()
                print('load trades today')
                
                if (singleMulti == "single"):
                    sqlCode = "SELECT * FROM TRADES WHERE date "+ selectSymbol + str(dateRange)+ " ORDER BY DATE"
                    print(sqlCode, [dateRange])
                    print(type(sqlCode))
                    cursor.execute(sqlCode)
                    result = cursor.fetchall()
                    end = time.time()
                    print("TIME TO FETCH: ", end - start)
                    return result
                else:
                    print("Error: issue with single-date trade querying")
                return result
            except sqlite3.Error as error:
                print('Error occurred- ', error)
            finally:
                if sqliteConnection:
                    #print('trades loaded. ending connection')
                    sqliteConnection.close()  
                else:
                    print('db wasn\'t opened')
    def loadStats(self, file, singleMulti, timeFrame, collation, options, timeName):
        if (os.path.isfile(file)):
# Time Frame:  ['2026-06-01', '2026-06-31']
# Collation:  singleContract
# options:  rating
            if (singleMulti == 'grouped'):
                try:
                    print('Calculating Stats from DB')
                    sqliteConnection = sqlite3.connect(file)
                    cursor = sqliteConnection.cursor()
                    print(timeFrame)
                    allTrades = []
                    week1 = []
                    week2 = []
                    week3 = []
                    week4 = []
                    week5 = []
                    ratingList = []
                    questionList = [week1, week2, week3, week4, week5]
                    finalNames = ['rating', 'allTrades', 'week1', 'week2', 'week3', 'week4', 'week5']
                    finalData = [ratingList, allTrades,week1, week2, week3, week4, week5]
                    def overallStats():
                        cursor.execute('SELECT pl, rating FROM Trades')
                        allresult = cursor.fetchall()
                        for x in allresult:
                            allTrades.append(x[0])
                            if (x[1] == 'A'):
                                ratingList.append(1)
                            elif (x[1] == 'B'):
                                ratingList.append(2)
                            elif (x[1] == 'C'):
                                ratingList.append(3)
                            elif (x[1] == 'D'):
                                ratingList.append(4)
                            elif (x[1] == 'F'):
                                ratingList.append(5)
                    overallStats()
                    i = 0
                    while i < len(timeFrame):
                        sqlPhrase =  str('SELECT pl FROM Trades WHERE date BETWEEN  \'' + timeFrame[i][0] + '\' AND \'' + timeFrame[i][1] + '\'')
                        cursor.execute(sqlPhrase)
                        result = cursor.fetchall()
                        currentList = questionList[i]
                        for x in result:
                         currentList.append(x[0])
                        i+= 1
                    if (week1 == []):
                        finalNames.remove('week1')
                        finalData.remove(week1)
                    if (week2 == []):
                        finalNames.remove('week2')
                        finalData.remove(week2)
                    if (week3 == []):
                        finalNames.remove('week3')
                        finalData.remove(week3)
                    if (week4 == []):
                        finalNames.remove('week4')
                        finalData.remove(week4)
                    if (week5 == []):
                        print('WEEK 5 HAS DATA')
                        finalNames.remove('week5')
                        finalData.remove(week5)
                    print([finalNames, finalData])
                    return [finalNames, finalData]
                except sqlite3.Error as error:
                    print('Error occurred- ', error)
                finally:
                    if sqliteConnection:
                        sqliteConnection.close()
            elif (collation == 'dailyTotal'):
                try:
                    sqliteConnection = sqlite3.connect(file)
                    cursor = sqliteConnection.cursor()
                    sqlStart = str('SELECT pl, rating, date' )
                    if (singleMulti == 'single'):
                        sqlEnd = str('  FROM Trades')
                        sqlPhrase = str(sqlStart + sqlEnd)
                        cursor.execute(sqlPhrase)
                    else:
                        sqlEnd = str(' FROM Trades WHERE date BETWEEN \'' + timeFrame[0] + '\' AND \'' + timeFrame[1] + '\'')
                        sqlPhrase = str(sqlStart + sqlEnd)
                        cursor.execute(sqlPhrase)
                    result = cursor.fetchall()
                    ratingList = []
                    plList = []
                    dateList = []
                    dateIndex = []
                    addedPlList = []
                    if (result != ""):
                        for x in result:
                            if (x[1] == 'A'):
                                ratingList.append(1)
                            elif (x[1] == 'B'):
                                ratingList.append(2)
                            elif (x[1] == 'C'):
                                ratingList.append(3)
                            elif (x[1] == 'D'):
                                ratingList.append(4)
                            elif (x[1] == 'F'):
                                ratingList.append(5)
                            plList.append(x[0])
                            dateList.append(x[2])
                        print('DATE LIST : ' , dateList)
                        print('PL LIST: ', plList)
                        i = 1
                        while i < len(dateList):
                            if (dateList[i] == dateList[i - 1]):
                                finalVal = plList[i] + plList[i - 1]
                                plList[i - 1] = ''
                                plList[i] = finalVal
                                i += 1
                            else:
                                i += 1
                        p = 0
                        while p < len(plList):
                            if (plList[p] != ''):
                                addedPlList.append(plList[p])
                                p += 1
                            else:
                                p += 1
                        return [['rating', 'dailyTotal'], [ratingList, addedPlList]]
                    else:
                        return ""
                except sqlite3.Error as error:
                    print('Error occurred- ', error)
                finally:
                    if sqliteConnection:
                        sqliteConnection.close()
            else:
                try:
                    print('Calculating Stats from DB')
                    sqliteConnection = sqlite3.connect(file)
                    cursor = sqliteConnection.cursor()
                    optionCode = options
                    sqlStart = str('SELECT pl, rating, ' + options )
                    if (options == ''):
                        sqlStart = str('SELECT pl, rating')
                    elif (options == 'buySell'):
                        sqlStart = str('SELECT pl, rating, buySell ')
                    if (collation == 'singleContract'):
                        sqlStart = sqlStart + ', contracts'
                    if (singleMulti == 'single'):
                        
                        sqlEnd = str(' , contracts FROM Trades')
                        sqlPhrase = str(sqlStart + sqlEnd)
                        print(sqlPhrase)
                        cursor.execute(sqlPhrase)
                    elif (singleMulti == 'multi'):
                        sqlEnd = str(' , contracts FROM Trades WHERE date BETWEEN \'' + timeFrame[0] + '\' AND \'' + timeFrame[1] + '\'')
                        sqlPhrase = str(sqlStart + sqlEnd)
                        print(sqlPhrase)
                        cursor.execute(sqlPhrase)
                    elif (singleMulti == 'grouped'):
                        print('GROUPED')
                    result = cursor.fetchall()
                    contractList = []
                    ratingList = []
                    yesCustomList = []
                    noCustomList = []
                    plList = []
                    callList = []
                    putList = []
                    finalNames = ['rating', timeName]
                    finalData = [ratingList, plList]
                    print(result)
                    if (result != ""):
                        for x in result:
                            plList.append(x[0])
                            if (options == 'buySell'):
                                if (x[2] == 'long'):
                                    callList.append(x[0])
                                elif (x[2] == 'short'):
                                    putList.append(x[0])
                            if (collation == 'singleContract'):
                                contractList.append(x[0] / x[3])
                            if (x[1] == 'A'):
                                    ratingList.append(1)
                            elif (x[1] == 'B'):
                                    ratingList.append(2)
                            elif (x[1] == 'C'):
                                    ratingList.append(3)
                            elif (x[1] == 'D'):
                                    ratingList.append(4)
                            elif (x[1] == 'F'):
                                    ratingList.append(5)
                            if (options != ''):
                                if (x[2] == 'on'):
                                    yesCustomList.append(x[0])
                                elif (x[2] == 'off'):
                                    noCustomList.append(x[0])
                        if (collation == 'singleContract'):
                            finalData.append(contractList)
                            finalNames.append(collation)
                        if (options != ''):
                            if (options == 'buySell'):
                                finalNames.append('long')
                                finalNames.append('short')
                                finalData.append(callList)
                                finalData.append(putList)
                            else:
                                finalData.append(yesCustomList)
                                finalNames.append(options)
                        return [finalNames, finalData]
                    else:
                        return ""
               
                except sqlite3.Error as error:
                    print('Error occurred- ', error)
                finally:
                    if sqliteConnection:
                        sqliteConnection.close()
                
    def createNewFile(self, fileName, fileLocation, referenceFile):
#<!-- CREATE TABLE "Trades" (
# 	"id"	INTEGER NOT NULL UNIQUE COLLATE BINARY,
# 	"pl"	NUMERIC NOT NULL COLLATE BINARY,
# 	"date"	TEXT COLLATE BINARY,
# 	"trade_start"	TEXT COLLATE BINARY,
# 	"trade_length"	INTEGER COLLATE BINARY,
# 	"explanation"	TEXT COLLATE BINARY,
# 	"contracts"	INTEGER NOT NULL COLLATE BINARY,
# 	"dte"	INTEGER COLLATE BINARY,
# 	"rating"	TEXT COLLATE BINARY,
# 	"buySell"	INTEGER COLLATE BINARY,
# 	"countertrend"	INTEGER COLLATE BINARY,
# 	"confirmation"	INTEGER COLLATE BINARY,
# 	"chased"	INTEGER COLLATE BINARY,
# 	"cut_short"	INTEGER COLLATE BINARY,
# 	"pic1"	BLOB COLLATE BINARY,
# 	"pic2"	BLOB COLLATE BINARY,
# 	"pic3"	BLOB COLLATE BINARY,
# 	"pic4"	BLOB COLLATE BINARY,
# 	PRIMARY KEY("id" AUTOINCREMENT)
# ); -->
        newFileName = str(fileName + '.db')
        newFile = open(str(fileName + '.db'), 'x')#makes the file just fine, in same dir though
        newFileLocation = str(os.path.abspath(str(fileName + '.db')))
        newFile.close()#apparrently when a new file is made, it is opened so you cannot move it (as I see now with the whole open() thing. it wasn't letting me do it due to shutil saying that it can't do stuff with another process running, that was the process
        shutil.move(newFileLocation, fileLocation)
        # create and move new file
        #load prev data
        #add data to table
        try:#get settings instructions for how to make file
            sqliteConnection = sqlite3.connect('settings.db')
            cursor = sqliteConnection.cursor()
            cursor.execute('SELECT data_name, SQL_datatype FROM User_DB_Structure')
            sqlResult = cursor.fetchall()
            dataPhrase = ''
            sqliteConnection.close()
            for x in sqlResult:
                dataPhrase = dataPhrase + str('"'+ x[0]+ '" '+ x[1] + ',')
            print(dataPhrase)
            sqlPhrase = (str('CREATE TABLE "Trades" ( "id" INTEGER NOT NULL UNIQUE, ' + dataPhrase + ' PRIMARY KEY ("id" AUTOINCREMENT));'))
            try:#create the new file using those instructions
                newConnection = sqlite3.connect(str(fileLocation + '\\' + fileName + '.db'))
                newcursor = newConnection.cursor()
                #standard new data
                newcursor.execute(sqlPhrase)
                #prev data table
                newcursor.execute('CREATE TABLE "prevData" ("Month"	TEXT NOT NULL,"numTrades"	INTEGER NOT NULL,"numWins"	INTEGER NOT NULL,"numLosses"	INTEGER NOT NULL,"ww"	NUMERIC NOT NULL,"multiPl"	NUMERIC NOT NULL,"multiWAmt"	NUMERIC NOT NULL,"multiLAmt"	NUMERIC NOT NULL,"multiWAvg"	NUMERIC NOT NULL,"multiLAvg"	NUMERIC NOT NULL,"multiTotalAvg"	NUMERIC NOT NULL,"multiProjection"	NUMERIC NOT NULL,"multiWLR"	NUMERIC NOT NULL,"singlePl"	NUMERIC NOT NULL,"singleWAmt"	NUMERIC NOT NULL,"singleLAmt"	NUMERIC NOT NULL,"singleWAvg"	NUMERIC NOT NULL,"singleLAvg"	NUMERIC NOT NULL,"singleTotalAvg"	NUMERIC NOT NULL,"singleProjection"	NUMERIC NOT NULL,"singleWLR"	NUMERIC NOT NULL,PRIMARY KEY("Month"));')
                #prev day of week table
                newConnection.commit()
                newcursor.execute('CREATE TABLE "prevDayOfWeeks" ("date" TEXT NOT NULL, "Month"	NUMERIC NOT NULL,"dayOfWeek"	NUMERIC NOT NULL,"pl" NUMERIC NOT NULL)')
                newConnection.commit()
            except sqlite3.Error as error:
                print('Error occurred- Create New File: ', error)
            finally:
                if newConnection:
                    newConnection.close()
        except sqlite3.Error as error:
            print('Error occurred- ', error)
        finally:
            if sqliteConnection:
                sqliteConnection.close()
                self.createPastStats( referenceFile, str(fileLocation + '/' + fileName + '.db'))
                #print(str(fileLocation + '\\' + fileName + '.db'))
                self.saveFavoriteFile(str(fileLocation + '/' + fileName + '.db'))
    def createPastStats(self, referenceFile, fileLocation):
        try:#get month data from referenceFile so the other functions can put it in the new file
            sqliteConnection = sqlite3.connect(referenceFile)
            cursor = sqliteConnection.cursor()
            cursor.execute('SELECT pl, contracts, date FROM Trades' )
            sqlResult = cursor.fetchall()
            sqliteConnection.close()
            self.appendOldMonths(referenceFile, fileLocation)
            self.appendOldWeeks(referenceFile, fileLocation)
            self.monthlyStats(sqlResult, referenceFile, fileLocation)
            self.dayOfWeek(sqlResult, fileLocation)
        except sqlite3.Error as error:
             print('Error occurred- Create Past Stats ', error)
        finally:
            if sqliteConnection:
                sqliteConnection.close()
    def monthlyStats(self, result, referenceFile, fileLocation):
        ##Trades, #W's, #L's, pl, ww, w amt, lamt, avgw, avgl, totalAvg, projection, wlRatio
        multipl = []
        singlepl = []
        winMulti = []
        lossMulti = []
        winSingle = []
        lossSingle = []
        for x in result:
            multipl.append(x[0])
            singlePlIndex = int(x[0]) / int(x[1])
            singlepl.append(singlePlIndex)
            if (x[0] > 0):
                winMulti.append(x[0])
                winSingle.append(singlePlIndex)
            else:
                lossMulti.append(x[0])
                lossSingle.append(singlePlIndex)
        numTrades = len(multipl)
        numWins = len(winMulti)
        numLosses = len(lossMulti)
        multiPlVal = sum(multipl)
        singlePlVal = round(sum(singlepl),2)
        ww = round((numWins / numTrades) * 100,2)
        multiWAmt = round(sum(winMulti),2)
        multiLAmt = round(sum(lossMulti),2)
        singleWAmt = round(sum(winSingle),2)
        singleLAmt = round(sum(lossSingle),2)
        multiWAvg = round(multiWAmt / numWins,2)
        multiLAvg = round(multiLAmt / numLosses,2)
        singleWAvg = round((singleWAmt / numWins), 2)
        singleLAvg = round(singleLAmt / numLosses,2)
        multiTotalAvg = round(sum(multipl) / len(multipl),2)
        singleTotalAvg = round(sum(singlepl) / len(singlepl),2)
        multiProjection = round((multiWAvg * ww) + (multiLAvg * (100 - ww)),2)
        singleProjection = round((singleWAvg * ww) + (singleLAvg * (100 - ww)),2)
        multiWLDivided = round((multiLAvg / multiWAvg), 2)
        singleWLDivided = round((singleLAvg / singleWAvg), 2)
        multiWLR = str('1:' + str(multiWLDivided))
        singleWLR = str('1:' + str(singleWLDivided))
        
        monthName = referenceFile.split('\\')
        print('BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB', monthName)
        print('singleWAvg : ' , (singleWAmt / numWins))

        totalStatsReturn = [[numTrades, numWins, numLosses, ww], 
        [multiPlVal, multiWAmt, multiLAmt, multiWAvg, multiLAvg, multiTotalAvg, multiProjection, multiWLR ],
        [singlePlVal, singleWAmt, singleLAmt, singleWAvg, singleLAvg, singleTotalAvg, singleProjection, singleWLR]]
        try:#get month data from referenceFile so the other functions can put it in the new file
            sqliteConnection = sqlite3.connect(fileLocation)
            cursor = sqliteConnection.cursor()
            cursor.execute('INSERT INTO prevData(Month, numTrades, numWins, numLosses, ww, multiPl, multiWAmt, multiLAmt, multiWAvg, multiLAvg, multiTotalAvg, multiProjection, multiWLR, singlePl, singleWAmt, singleLAmt, singleWAvg, singleLAvg, singleTotalAvg, singleProjection, singleWLR) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [
            monthName[-1][:-3], numTrades, numWins, numLosses, ww, multiPlVal, multiWAmt, multiLAmt, multiWAvg, multiLAvg, multiTotalAvg, multiProjection, multiWLR,
            singlePlVal, singleWAmt, singleLAmt, singleWAvg, singleLAvg, singleTotalAvg, singleProjection, singleWLR])
            sqliteConnection.commit()
        except sqlite3.Error as error:
             print('Error occurred- MonthlyStats() ', error)
        finally:
            if sqliteConnection:
                sqliteConnection.close()
#     CREATE TABLE "prevData" (
# 	"Month"	TEXT NOT NULL,
# 	"numTrades"	INTEGER NOT NULL,
# 	"numWins"	INTEGER NOT NULL,
# 	"numLosses"	INTEGER NOT NULL,
# 	"ww"	NUMERIC NOT NULL,
# 	"multiPl"	NUMERIC NOT NULL,
# 	"multiWAmt"	NUMERIC NOT NULL,
# 	"multiLAmt"	NUMERIC NOT NULL,
# 	"multiWAvg"	NUMERIC NOT NULL,
# 	"multiLAvg"	NUMERIC NOT NULL,
# 	"multiTotalAvg"	NUMERIC NOT NULL,
# 	"multiProjection"	NUMERIC NOT NULL,
# 	"multiWLR"	NUMERIC NOT NULL,
# 	"singlePl"	NUMERIC NOT NULL,
# 	"singleWAmt"	NUMERIC NOT NULL,
# 	"singleLAmt"	NUMERIC NOT NULL,
# 	"singleWAvg"	NUMERIC NOT NULL,
# 	"singleLAvg"	NUMERIC NOT NULL,
# 	"singleTotalAvg"	NUMERIC NOT NULL,
# 	"singleProjection"	NUMERIC NOT NULL,
# 	"singleWLR"	NUMERIC NOT NULL,
# 	PRIMARY KEY("Month")
# );
# CREATE TABLE "prevDayOfWeeks" (
#     "date" TEXT NOT NULL
# 	"Month"	NUMERIC NOT NULL,
# 	"dayOfWeek"	NUMERIC NOT NULL,
# 	"pl"	NUMERIC NOT NULL
# )
    def appendOldMonths(self, oldFile, newFile):
        try:
            sqliteConnection = sqlite3.connect(oldFile)
            cursor = sqliteConnection.cursor()
            cursor.execute('SELECT * FROM prevData')
            result = cursor.fetchall()
            sqlVals = []
            for x in result:
                sqlVals.append(x)
            sqliteConnection.close()
            if len(sqlVals) > 0:
                try:
                    newDbConnection = sqlite3.connect(newFile)
                    cursor = newDbConnection.cursor()
                    print('AAAAAAAAAAAA', len(sqlVals))
                    print('SQL VALS: ', sqlVals)
                    for x in sqlVals:
                        cursor.execute('INSERT INTO prevData(Month, numTrades, numWins, numLosses, ww, multiPl, multiWAmt, multiLAmt, multiWAvg, multiLAvg, multiTotalAvg, multiProjection, multiWLR, singlePl, singleWAmt, singleLAmt, singleWAvg, singleLAvg, singleTotalAvg, singleProjection, singleWLR) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [
                            x[0], x[1], x[2], x[3], x[4], x[5], x[6], x[7], x[8], x[9], x[10], x[11], x[12], x[13], x[14], x[15], x[16], x[17], x[18], x[19], x[20]
                        ])
                        newDbConnection.commit()
                except sqlite3.Error as error:
                    print('Error occurred- Append Old Months ', error)
                finally:
                    if newDbConnection:
                        newDbConnection.close()
        except sqlite3.Error as error:
                print('Error occurred: ', error)
        finally:
                if sqliteConnection:
                    sqliteConnection.close()
    def appendOldWeeks(self, oldFile, newFile):
        try:
            sqliteConnection = sqlite3.connect(oldFile)
            cursor = sqliteConnection.cursor()
            cursor.execute('SELECT * FROM prevDayOfWeeks')
            result = cursor.fetchall()
            sqlVals = []
            for x in result:
                sqlVals.append(x)
            sqliteConnection.close()
            if len(sqlVals)!= 0:
                try:
                    newDBConnection = sqlite3.connect(newFile)
                    cursor = newDBConnection.cursor()
                    for x in sqlVals:
                        cursor.execute('INSERT INTO prevDayOfWeeks (date, Month, dayOfWeek, pl) VALUES (?, ?, ?, ?)', [x[0], x[1], x[2], x[3]])
                        newDBConnection.commit()
                except sqlite3.Error as error:
                    print('Error occurred- AppendOldWeeks', error)
                finally:
                    if newDBConnection:
                        newDBConnection.close()
           # cursor.execute('INSERT INTO prevDayOfWeeks (date, Month, dayOfWeek, pl) VAlues', sqlValueList)
            #sqliteConnection.commit()
        except sqlite3.Error as error:
             print('Error occurred- ', error)
        finally:
            if sqliteConnection:
                sqliteConnection.close()
    def dayOfWeek(self, result, newFile):
        #pl, contracts, date;
        plList = []
        dateList = []
        for x in result:
            plList.append(x[0])
            dateList.append(x[2])
        dailyTotalList = []
        i = 1
        while i < len(plList):
            if (dateList[i] == dateList[i - 1]):
                finalVal = plList[i] + plList[i - 1]
                plList[i - 1] = ''
                dateList[i - 1] = ''
                plList[i] = finalVal
                i += 1
            else:
                i += 1
        l = 0
        while l < len(plList):
            if (plList[l] != ''):
                dailyTotalList.append([plList[l], dateList[l]])
                l += 1
            else:
                l += 1
        print('DIALY TOTALS: ', dailyTotalList)
        sqlValueList = []
        for x in dailyTotalList:
            dateText = x[1].split('-')
            theDate = dt.datetime(int(dateText[0]), int(dateText[1]), int(dateText[2]))
            #print(theDate.weekday())
            sqlValueList.append( (x[1], dateText[1], theDate.weekday(), x[0]))
            #.month
            #.day
        try:
            sqliteConnection = sqlite3.connect(newFile)
            cursor = sqliteConnection.cursor()
            for x in sqlValueList:
                cursor.execute('INSERT INTO prevDayOfWeeks (date, Month, dayOfWeek, pl) VALUES (?, ?, ?, ?)', [x[0], x[1], x[2], x[3]])
            sqliteConnection.commit()
        except sqlite3.Error as error:
            print('Error occurred- DayOfWeek', error)
        finally:
            if sqliteConnection:
                sqliteConnection.close()

# d = dt.date(2002, 12, 31)
# d.replace(day=26)
# #########################################
if __name__ == '__main__':
    api = Api()
    window = webview.create_window('Trade Tracker', 'tt2.html', js_api=api)
    #webview.settings['OPEN_DEVTOOLS_IN_DEBUG'] = False# new setting that just came out to allow refresh
    webview.start(debug = True)
    # webview.start()