import webview
import sqlite3
import time
import shutil
import os

#create connection
#create cursor
#create query
#execute query
#commit query
#close cursor
#close connection
class Api:
    def saveFolderLocation(self):
        #FileDialog.FOLDER
        #result = window.create_file_dialog(dialog_type=webview.FOLDER_DIALOG)#depreciated
        result = window.create_file_dialog(dialog_type=webview.FileDialog.FOLDER)
        return result
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
                return [pl_added, data_ww ]
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
                export_settings = [result[1][1], mini_stat_result[0], mini_stat_result[1], user_setting_result[0], user_setting_result[1], user_setting_result[2], user_setting_result[3], color_result]
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
    def saveTrade(self, file, plVal, dateVal, tradeStartVal, tradeLengthVal, explanationVal, contractVal, dteVal, selectGradeVal, callPut,
        pic1, pic2, pic3, pic4, customNames, customVal): 
        if (os.path.isfile(file)):
            try: 
              sqliteConnection = sqlite3.connect(file)
              cursor = sqliteConnection.cursor()
              dbParameters = ['pl', 'date', 'trade_start', 'trade_length', 'explanation', 'contracts', 'dte', 'rating', 'callput', 'pic1', 'pic2', 'pic3', 'pic4']
              dbData = [plVal, dateVal, tradeStartVal, tradeLengthVal, explanationVal, contractVal,dteVal, selectGradeVal, callPut, pic1, pic2, pic3, pic4]
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
              #cursor.execute("INSERT INTO Trades(pl, date, trade_start, trade_length, explanation, contracts, dte, rating, callput, pic1, pic2, pic3, pic4, countertrend, confirmation, chased, cut_short ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", (plVal, dateVal, tradeStartVal, tradeLengthVal, explanationVal, contractVal, dteVal, selectGradeVal, callPut, countertrendVal, confirmationVal, chasedVal, cutShortVal, pic1, pic2, pic3, pic4))
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
            dbParameters = ['id', 'pl', 'date', 'trade_start', 'trade_length', 'explanation', 'contracts', 'dte', 'rating', 'callput', 'pic1', 'pic2', 'pic3', 'pic4']
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
            #cursor.execute("INSERT INTO Trades(pl, date, trade_start, trade_length, explanation, contracts, dte, rating, callput, pic1, pic2, pic3, pic4, countertrend, confirmation, chased, cut_short ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", (plVal, dateVal, tradeStartVal, tradeLengthVal, explanationVal, contractVal, dteVal, selectGradeVal, callPut, countertrendVal, confirmationVal, chasedVal, cutShortVal, pic1, pic2, pic3, pic4))
            # cursor.execute("REPLACE INTO Trades (id, pl, date, trade_start, trade_length, explanation, contracts, dte, rating, callput, countertrend, confirmation, chased, cut_short, pic1, pic2, pic2, pic4) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", (idVal, newTradeValues[0], newTradeValues[1], newTradeValues[2], newTradeValues[3], newTradeValues[4], newTradeValues[5], newTradeValues[6], newTradeValues[7], newTradeValues[8], newTradeValues[9], newTradeValues[10], newTradeValues[11], newTradeValues[12], newTradeValues[13], newTradeValues[14], newTradeValues[15], newTradeValues[16]))
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
    def loadStats(self, file, singleMulti, timeFrame, collation, options):
            if (os.path.isfile(file)):
                try:
                    sqliteConnection= sqlite3.connect(file)
                    cursor = sqliteConnection.cursor()
                    collationPhrase = ''
                    if (collation == "singleContract"):
                        collationPhrase = ', contracts'
                    else:
                        collationPhrase = ', date'
                    #                     <option id="extras" value="">--Extras:--</option>
                    # <option id="dte" value="dte">Dte:</option>
                    # <option id="rating" value="rating">By Rating:</option>
                    # <option id="callPut" value="callPut">Call/Put:</option>
                    optionPhrase = (', ' +  options)
                    print(collationPhrase)
                    print(optionPhrase)
                    sqlPhrase = ''
                    returnedData = []
                    if (singleMulti == "single"):
                        # sqlPhrase = str("SELECT pl", collationPhrase, optionPhrase, 'FROM Trades')
                        sqlPhrase = "SELECT pl FROM TRADES"
                        cursor.execute(sqlPhrase)
                        result = cursor.fetchall()
                        for x in result:
                            outOfArray = x[0]
                            returnedData.append(x[0])

                        print(result)
                    elif (singleMulti == "multi"):
                        sqlPhrase = str('SELECT pl', collationPhrase, optionPhrase, 'FROM TRADES WHERE date BETWEEN ? AND ?')
                        cursor.execute(sqlPhrase, timeFrame)
                        print(result)
                        result = cursor.fetchall()
                    elif (singleMulti == "group"):#weekly being done
                        sqlPhrase = 'SELECT pl', collationPhrase, optionPhrase, 'FROM TRADES WHERE date BETWEEN ? AND ?'
                        responseData = []
                        for x in timeFrame:
                            cursor.execute(sqlPhrase, timeFrame[x])
                            result = cursor.fetchall()
                            responseData.push(result)
                    else:
                        print('error:time frame setup on the loadStats function is not wokring')
                    #cursor.execute("SELECT * FROM Trades WHERE date BETWEEN '2026-04-22' AND '2026-04-23' ")
                    #cursor.execute("SELECT * FROM Trades WHERE date BETWEEN ? and ?", [dateRange[0], dateRange[3]])
                    #cursor.execute("SELECT * FROM Trades WHERE date BETWEEN ? AND ? ORDER BY date", [dateRange[0], dateRange[3]])
                    #result = cursor.fetchall()
                    
                    return returnedData
                except sqlite3.Error as error:
                    print('Error occurred- ', error)
                finally:
                    if sqliteConnection:
                       # print('loaded weekly trades. ending connection')
                        sqliteConnection.close()
    def createNewFile(self, fileName, fileLocation):
#         <!-- CREATE TABLE "Trades" (
# 	"id"	INTEGER NOT NULL UNIQUE COLLATE BINARY,
# 	"pl"	NUMERIC NOT NULL COLLATE BINARY,
# 	"date"	TEXT COLLATE BINARY,
# 	"trade_start"	TEXT COLLATE BINARY,
# 	"trade_length"	INTEGER COLLATE BINARY,
# 	"explanation"	TEXT COLLATE BINARY,
# 	"contracts"	INTEGER NOT NULL COLLATE BINARY,
# 	"dte"	INTEGER COLLATE BINARY,
# 	"rating"	TEXT COLLATE BINARY,
# 	"callput"	INTEGER COLLATE BINARY,
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

        newFile = open(str(fileName + '.db'), 'x')#makes the file just fine, in same dir though
        newFileLocation = str(os.path.abspath(str(fileName + '.db')))
        newFile.close()#apparrently when a new file is made, it is opened so you cannot move it (as I see now with the whole open() thing. it wasn't letting me do it due to shutil saying that it can't do stuff with another process running, that was the process
        shutil.move(newFileLocation, fileLocation)
        # create and move new file
        #load prev data
        #add data to table
        try:
            sqliteConnection = sqlite3.connect('settings.db')
            cursor = sqliteConnection.cursor()
            cursor.execute('SELECT data_name, SQL_datatype FROM User_DB_Structure')
            result = cursor.fetchall()
            dataPhrase = ''
            sqliteConnection.close()
            for x in result:
                dataPhrase = dataPhrase + str('"'+ x[0]+ '" '+ x[1] + ',')
            print(dataPhrase)
            sqlPhrase = (str('CREATE TABLE "Trades" ( "id" INTEGER NOT NULL UNIQUE, ' + dataPhrase + ' PRIMARY KEY ("id" AUTOINCREMENT));'))
            try:
                newConnection = sqlite3.connect(str(fileLocation + '\\' + fileName + '.db'))
                newcursor = newConnection.cursor()
                newcursor.execute(sqlPhrase)
                newConnection.commit()
            except sqlite3.Error as error:
                print('Error occurred- ', error)
            finally:
                if newConnection:
                    newConnection.close()
            print(str(fileLocation + '\\' + fileName + '.db'))
            self.saveFavoriteFile(str(fileLocation + '\\' + fileName + '.db'))
        except sqlite3.Error as error:
            print('Error occurred- ', error)
        finally:
            if sqliteConnection:
                sqliteConnection.close()

#########################################
if __name__ == '__main__':
    api = Api()
    window = webview.create_window('Trade Tracker', 'tt2.html', js_api=api)
    webview.settings['OPEN_DEVTOOLS_IN_DEBUG'] = False# new setting that just came out to allow refresh
    webview.start(debug = True)
    # webview.start()