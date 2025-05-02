from flask import Flask, request, jsonify
from flask_cors import CORS  
from db_config import create_connection

app = Flask(__name__)
CORS(app)  

@app.route('/submit', methods=['POST'])
def submit_data():
    data = request.json
    name = data.get('name')
    job = data.get('job')
    skills = data.get('skills')

    if not name or not job or not skills:
        return jsonify({"error": "Invalid input data"}), 400  

    skills_str = ",".join(skills)

    conn = create_connection()
    if conn:
        print("✅ Database connection established inside route.")
        cursor = conn.cursor()
        try:
            query = "INSERT INTO users (name, job, skills) VALUES (%s, %s, %s)"
            cursor.execute(query, (name, job, skills_str))
            conn.commit()
            print("✅ Data inserted successfully.")
            return jsonify({"name": name, "job": job, "skills": skills}), 200
        except Exception as e:
            print(f"❌ Error inserting data: {e}")  
            return jsonify({"error": "Database error", "details": str(e)}), 500
        finally:
            cursor.close()
            conn.close()
            print("🔒 Connection closed.")
    else:
        print("❌ Failed to connect to the database inside route.")
        return jsonify({"error": "Failed to connect to the database"}), 500

if __name__ == "__main__":
    app.run(debug=True)
