from connection import connect_to_db
from .logger import logger

# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

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

        # Set environment variables for your credentials
        # Read more at http://twil.io/secure
        # account_sid = "ACe30998fba8470202c114f2ce5a8b632d"
        # auth_token = "9c538ade9db1c9d5e87dcb08e04274ac"
        # client = Client(account_sid, auth_token)
        # message = client.messages.create(
        #     body="Hello from Twilio",
        #     from_="+13158471955",
        #     to="+918639693342"
        # )
        # print(message.sid)

        mycursor.close()
        mydb.close()
    else:
        mycursor = None

    return results

def get_school_series_data():
    mycursor = None

    mydb = connect_to_db()
    
    if mydb.is_connected():
        print("Connection successful")
    else:
        print("Connection failed")

    mycursor = mydb.cursor()

    results = []
    
    if mydb.is_connected():
        mycursor.execute("SELECT DISTINCT(st.name) as standard, st.id as standard_id, se.name as series, se.id as series_id FROM lesson l, series se, standard st, subject su WHERE l.series = se.id AND l.standard = st.id AND l.subject = su.id ORDER BY se.name")
        rows = mycursor.fetchall()
        
        # get the column names
        col_names = [description[0] for description in mycursor.description]

        # create a list of dictionaries where each dictionary represents a row with column names as keys and row values as values
        results = [dict(zip(col_names, row)) for row in rows]

        logger.debug(results)

        mycursor.close()
        mydb.close()
    else:
        mycursor = None

    return results