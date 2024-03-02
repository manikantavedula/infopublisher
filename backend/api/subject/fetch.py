from connection import connect_to_db

def get_data_by_standard(standard):
    mycursor = None

    mydb = connect_to_db()
    
    if mydb.is_connected():
        print("Connection successful")
    else:
        print("Connection failed")

    mycursor = mydb.cursor()

    results = []
    
    if mydb.is_connected():
        mycursor.execute("SELECT s.* FROM `lesson` l, `subject` s WHERE l.standard = %s AND l.subject = s.id GROUP BY s.name", (standard,))
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
        mycursor.execute("SELECT * FROM subject")
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
