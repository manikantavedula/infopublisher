from connection import connect_to_db
from .logger import logger

# Download the helper library from https://www.twilio.com/docs/python/install
# import os
# from twilio.rest import Client

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
            school_series = [str(series_standard_id) for series_standard_id in res['school_series'].split(", ")]
            params = {}

            for item in school_series:
                series_id, standard_id = item.split("|-|")
                series_id = int(series_id)
                standard_id = int(standard_id)
                
                if series_id not in params:
                    params[series_id] = []
                
                params[series_id].append(standard_id)

            series_ids = list(params.keys())
            standard_ids = [standard_id for standard_ids_list in params.values() for standard_id in standard_ids_list]
            distributor_id = res['distributor']

            # Create a SQL query with the IN operator to get rows where id matches any value in id_list
            series_query = "SELECT id, name FROM series WHERE id IN (%s)"
            standard_query = "SELECT id, name FROM standard WHERE id IN (%s)"
            distributor_query = "SELECT id, name FROM distributor WHERE id IN (%s)"

            series_placeholders = ",".join(["%s"] * len(series_ids))
            standard_placeholders = ",".join(["%s"] * len(standard_ids))
            distributor_placeholders = ",".join(["%s"] * len(distributor_id))

            series_query = series_query % series_placeholders
            standard_query = standard_query % standard_placeholders
            distributor_query = distributor_query % distributor_placeholders

            mycursor.execute(series_query, tuple(series_ids))
            series_rows = mycursor.fetchall()

            mycursor.execute(standard_query, tuple(standard_ids))
            standard_rows = mycursor.fetchall()

            mycursor.execute(distributor_query, tuple(distributor_id))
            distributor_rows = mycursor.fetchall()

            # series_names = [row[0] for row in series_rows]
            # standard_names = [row[0] for row in standard_rows]
            
            distributor_data = {}
            for row in distributor_rows:
                distributor_id, distributor_name = row
                distributor_data[distributor_id] = {'distributor_id': distributor_id, 'distributor_name': distributor_name}
            
            series_data = {}
            for row in series_rows:
                series_id, series_name = row
                series_data[series_id] = {'series_id': series_id, 'series_name': series_name, 'standards': []}

            for row in standard_rows:
                standard_id, standard_name = row
                for series_id, standards in params.items():
                    if standard_id in standards:
                        series_data[series_id]['standards'].append({'standard_id': standard_id, 'standard_name': standard_name})

            res['formatted_series'] = list(series_data.values())

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

        # logger.debug(f'school series {results}')

        # Find dictionaries with series_id = 40
        dictionaries_with_series_40 = [d for d in results if d['series_id'] == 40]

        # Create new dictionaries with series_id = 1 by copying values from dictionaries with series_id = 40
        new_dictionaries_with_series_1 = [{'standard': d['standard'], 'standard_id': d['standard_id'], 'series': 'Global Smart', 'series_id': 1} for d in dictionaries_with_series_40]

        # Append the new dictionaries to the existing data
        results.extend(new_dictionaries_with_series_1)

        mycursor.close()
        mydb.close()
    else:
        mycursor = None

    return results