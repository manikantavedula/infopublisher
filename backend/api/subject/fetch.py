from connection import connect_to_db

def get_data_by_standard(series, standard):
    mycursor = None

    mydb = connect_to_db()
    
    if mydb.is_connected():
        print("Connection successful")
    else:
        print("Connection failed")

    mycursor = mydb.cursor()

    results = []# Execute the SQL query
    
    query = ("SELECT s.* FROM series s WHERE s.proper_name_id = %s")
    mycursor.execute(query, ('whiz_kid',))
    result1 = mycursor.fetchone()
    column_names1 = mycursor.column_names

    series_name = ''
    
    query = ("SELECT s.* FROM series s WHERE s.proper_name_id = %s")
    mycursor.execute(query, (series,))
    result2 = mycursor.fetchone()
    column_names2 = mycursor.column_names

    if(series == 'global_smart'):
        if result1:
            column_index1 = column_names1.index('id')
            series_name = result1[column_index1]
        else:
            return False
    else:
        if result2:
            column_index2 = column_names2.index('id')
            series_name = result1[column_index2]
        else:
            return False
    
    if mydb.is_connected():
        mycursor.execute("SELECT s.* FROM `lesson` l, `subject` s WHERE l.series = %s AND l.standard = %s AND l.subject = s.id GROUP BY s.name", (series_name, standard,))
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
