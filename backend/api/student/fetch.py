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
        mycursor.execute("SELECT s.id as id, s.name as school, s.name as name, se.name as series, st.name as standard, s.contact as contact, s.email as email, s.address as address FROM student s, series se, standard st WHERE s.series = se.id AND s.standard = st.id")
        rows = mycursor.fetchall()
        
        # get the column names
        col_names = [description[0] for description in mycursor.description]

        # create a list of dictionaries where each dictionary represents a row with column names as keys and row values as values
        results = [dict(zip(col_names, row)) for row in rows]

        #logger.debug(results)

        mycursor.close()
        mydb.close()
    else:
        mycursor = None

    return results
