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
        mycursor.execute("SELECT * FROM school")
        rows = mycursor.fetchall()
        
        # get the column names
        col_names = [description[0] for description in mycursor.description]

        # create a list of dictionaries where each dictionary represents a row with column names as keys and row values as values
        results = [dict(zip(col_names, row)) for row in rows]

        logger.debug(results)

        for res in results:
            school_series = [int(id) for id in res['school_series'].split(", ")]
            params = tuple(school_series)

            # Create a SQL query with the IN operator to get rows where id matches any value in id_list
            query = "SELECT name FROM series WHERE id IN (%s)" % (','.join(['%s'] * len(school_series)))
            mycursor.execute(query, params)
            res2 = mycursor.fetchall()
            flat_list = [item for sublist in res2 for item in sublist]
            res['school_series'] = flat_list

        mycursor.close()
        mydb.close()
    else:
        mycursor = None

    return results
