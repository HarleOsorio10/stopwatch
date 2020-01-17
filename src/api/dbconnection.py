import MySQLdb

def connection():
    # Edited out actual values
    conn = MySQLdb.connect(host="localhost",
                           user="root",
                           passwd="",
                           db = "timer")
   
    cur = conn.cursor()
    return cur,conn