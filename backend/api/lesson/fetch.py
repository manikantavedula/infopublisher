from connection import connect_to_db
from .logger import logger

def get_data():
    mycursor = None

    mydb = connect_to_db()
    
    if mydb.is_connected():
        print("Connection successful")
    else:
        print("Connection failed")

    mycursor = mydb.cursor()

    results = []
    
    if mydb.is_connected():
        mycursor.execute("SELECT * FROM lesson")
        rows = mycursor.fetchall()
        
        # get the column names
        col_names = [description[0] for description in mycursor.description]

        # create a list of dictionaries where each dictionary represents a row with column names as keys and row values as values
        results = [dict(zip(col_names, row)) for row in rows]

        mycursor.close()
        mydb.close()
    else:
        mycursor = None

    return results

def get_data_by_id(d):
    print("Hello World databyid function")

    mycursor = None

    mydb = connect_to_db()
    
    if mydb.is_connected():
        print("Connection successful for lesson get_data_by_id")
    else:
        print("Connection failed")

    mycursor = mydb.cursor()

    results = []
    
    if mydb.is_connected():
        insert_query = "SELECT * FROM lesson WHERE series=%s AND standard=%s AND subject=%s AND type=%s"
        logger.debug(insert_query)
        values = (d['series'], d['standard'], d['subject'], "main")
        mycursor.execute(insert_query, values)
        rows = mycursor.fetchall()

        logger.debug(f'Lesson get some data {rows}')
        
        # get the column names
        col_names = [description[0] for description in mycursor.description]

        # create a list of dictionaries where each dictionary represents a row with column names as keys and row values as values
        results = [dict(zip(col_names, row)) for row in rows]

        mycursor.close()
        mydb.close()
    else:
        mycursor = None

    return results

def get_data_by_lesson_id(d):
    print("Hello World databylessonid function")

    mycursor = None

    mydb = connect_to_db()
    
    if mydb.is_connected():
        print("Connection successful for lesson get_data_by_lesson_id")
    else:
        print("Connection failed")

    mycursor = mydb.cursor()

    results = []
    
    if mydb.is_connected():
        insert_query = "SELECT * FROM lesson WHERE lesson_id=%s AND type=%s"
        logger.debug(insert_query)
        values = (d['lessonId'], "part")
        mycursor.execute(insert_query, values)
        rows = mycursor.fetchall()

        logger.debug(f'Lesson get some part data {rows}')
        
        # get the column names
        col_names = [description[0] for description in mycursor.description]

        # create a list of dictionaries where each dictionary represents a row with column names as keys and row values as values
        results = [dict(zip(col_names, row)) for row in rows]

        mycursor.close()
        mydb.close()
    else:
        mycursor = None

    return results
