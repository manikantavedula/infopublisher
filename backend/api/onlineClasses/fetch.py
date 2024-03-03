from connection import connect_to_db
from .logger import logger

def get_data_by_role(role, series, standard, subject):
    mycursor = None

    mydb = connect_to_db()
    
    if mydb.is_connected():
        print("Connection successful")
    else:
        print("Connection failed")

    mycursor = mydb.cursor()

    results = []

    query1 = ("SELECT s.* FROM series s WHERE s.id = %s")
    mycursor.execute(query1, (series,))
    result1 = mycursor.fetchone()
    column_names1 = mycursor.column_names
    
    query2 = ("SELECT s.* FROM series s WHERE s.proper_name_id = %s")
    mycursor.execute(query2, ('whiz_kid',))
    result2 = mycursor.fetchone()
    column_names2 = mycursor.column_names
    series_name = ''
    
    query3 = ("SELECT s.* FROM subject s WHERE s.id = %s")
    mycursor.execute(query3, (subject,))
    result3 = mycursor.fetchone()
    column_names3 = mycursor.column_names
    subject_name = ''

    if result1:
        column_index1 = column_names1.index('proper_name_id')
        series_name = result1[column_index1]

        if(series_name == 'global_smart'):
            if result2:
                column_index2 = column_names2.index('id')
                series_name = result2[column_index2]
            else:
                return False
        elif(series_name == 'smart_learn'):
            if result3:
                column_index3 = column_names3.index('proper_name_id')
                subject_name = result3[column_index3]

                if subject_name in ['telugu', 'hindi', 'english']:
                    if result2:
                        column_index2 = column_names2.index('id')
                        series_name = result2[column_index2]
                    else:
                        series_name = series
            else:
                return False
        else:
            series_name = series
    else:
        return False
    
    if mydb.is_connected():
        mycursor.execute("SELECT l.id, l.name, l.series, l.standard, l.subject, l.type, (SELECT COUNT(*) FROM lesson ln WHERE type=%s AND l.id = ln.lesson_id) as parts_length FROM `lesson` l WHERE l.type = %s AND l.series = %s AND l.subject = %s AND l.standard = %s", ('part', 'main', series_name, subject, standard))
        rows1 = mycursor.fetchall()
        
        # get the column names
        col_names1 = [description[0] for description in mycursor.description]

        mycursor.execute("SELECT l.id, l.name, l.series, l.standard, l.subject, l.type, l.lesson_id, l.live_video_id, l.animation_video_id FROM `lesson` l WHERE l.type = %s AND l.series = %s AND l.subject = %s AND l.standard = %s", ('part', series_name, subject, standard))
        rows2 = mycursor.fetchall()
        
        # get the column names
        col_names2 = [description[0] for description in mycursor.description]

        # create a list of dictionaries where each dictionary represents a row with column names as keys and row values as values
        results1 = [dict(zip(col_names1, row)) for row in rows1]
        results2 = [dict(zip(col_names2, row)) for row in rows2]

        results = [results1, results2]

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
    data = []
    
    if mydb.is_connected():
        mycursor.execute("SELECT se.id as series_id, se.name as series_name, st.id as standard_id, st.name as standard_name, su.name as subject_name, le.* FROM series se, standard st, subject su, lesson le WHERE le.series = se.id AND le.standard = st.id AND le.subject = su.id")
        rows1 = mycursor.fetchall()
        
        # get the column names
        col_names1 = [description[0] for description in mycursor.description]
        data = [dict(zip(col_names1, row)) for row in rows1]
        
        # logger.debug(f'{data}')
        logger.debug(f'online classes')

        # Find dictionaries with series_id = 40
        dictionaries_with_series_40 = [d for d in data if d['series_id'] == 40]
        dictionaries_with_telugu = [d for d in data if d['subject_name'] == 'Telugu']
        dictionaries_with_hindi = [d for d in data if d['subject_name'] == 'Hindi']

        # Create new dictionaries with series_id = 1 by copying values from dictionaries with series_id = 40
        new_dictionaries_with_series_1 = [{**d, 'series_name': 'Global Smart', 'series_id': 1} for d in dictionaries_with_series_40]
        new_dictionaries_with_series_telugu = [{**d, 'series_name': 'Smart Learn', 'series_id': 2} for d in dictionaries_with_telugu]
        new_dictionaries_with_series_hindi = [{**d, 'series_name': 'Smart Learn', 'series_id': 2} for d in dictionaries_with_hindi]

        # Append the new dictionaries to the existing data
        data.extend(new_dictionaries_with_series_1)
        data.extend(new_dictionaries_with_series_telugu)
        data.extend(new_dictionaries_with_series_hindi)

        series_map = {}

        for item in data:
            series_id = item['series_id']
            series_name = item['series_name']
            standard_id = item['standard_id']
            standard_name = item['standard_name']
            subject_name = item['subject_name']
            id = item['id']
            lesson_id = item['lesson_id']
            name = item['name']
            part_no = item['part_no']
            live_video_id = item.get('live_video_id')
            animation_video_id = item.get('animation_video_id')

            if series_name not in series_map:
                series_map[series_name] = {
                    'series_id': series_id,
                    'name': series_name,
                    'data': []
                }

            series_data = series_map[series_name]['data']

            standard_data = next((item for item in series_data if item['name'] == standard_name), None)
            if standard_data is None:
                standard_data = {
                    'standard_id': standard_id,
                    'name': standard_name,
                    'data': []
                }
                series_data.append(standard_data)

            subject_data = next((item for item in standard_data['data'] if item['name'] == subject_name), None)
            if subject_data is None:
                subject_data = {
                    'name': subject_name,
                    'data': []
                }
                standard_data['data'].append(subject_data)

            if item['type'] == 'main':
                main_item = {
                    'id': id,
                    'name': name,
                    'parts': []
                }
                subject_data['data'].append(main_item)
            else:
                main_item = next((item for item in subject_data['data'] if item['id'] == int(lesson_id)), None)
                if main_item is not None:
                    part_item = {
                        'id': id,
                        'name': name,
                        'partNo': part_no,
                        'liveVideoId': live_video_id,
                        'animationVideoId': animation_video_id
                    }
                    main_item.setdefault('parts', []).append(part_item)

        for series_name, series_data in series_map.items():
            results.append({
                'series_id': series_map[series_name]["series_id"],
                'name': series_name,
                'data': series_data['data']
            })

        # Find the indices of "Global Smart" and "Smart Learn" dictionaries
        global_smart_index = None
        smart_learn_index = None
        for index, item in enumerate(results):
            if item["name"] == "Global Smart":
                global_smart_index = index
            elif item["name"] == "Whiz Kid":
                smart_learn_index = index

        # Check if both "Global Smart" and "Smart Learn" dictionaries exist
        if global_smart_index is not None and smart_learn_index is not None:
            # Replace "data" object in "Global Smart" with "data" object from "Smart Learn"
            results[global_smart_index]["data"] = results[smart_learn_index]["data"]

        # Output the final result
        #logger.debug(f'results {results}')

        mycursor.close()
        mydb.close()
    else:
        mycursor = None

    return results
