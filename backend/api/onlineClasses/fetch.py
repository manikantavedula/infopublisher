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
    data = []
    
    if mydb.is_connected():
        mycursor.execute("SELECT se.name as series_name, st.name as standard_name, su.name as subject_name, le.* FROM series se, standard st, subject su, lesson le WHERE le.series = se.id AND le.standard = st.id AND le.subject = su.id")
        rows1 = mycursor.fetchall()
        
        # get the column names
        col_names1 = [description[0] for description in mycursor.description]
        data = [dict(zip(col_names1, row)) for row in rows1]

        logger.debug(f'results 1 {data}')

        series_map = {}

        for item in data:
            series_name = item['series_name']
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
                    'name': series_name,
                    'data': []
                }

            series_data = series_map[series_name]['data']

            standard_data = next((item for item in series_data if item['name'] == standard_name), None)
            if standard_data is None:
                standard_data = {
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
                'name': series_name,
                'data': series_data['data']
            })

        # Output the final result
        logger.debug(f'results {results}')

        mycursor.close()
        mydb.close()
    else:
        mycursor = None

    return results