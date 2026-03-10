from flask import Flask, render_template, jsonify
from models import db, Policy

app = Flask(__name__)

# CHANGE username/password/database if needed
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:Password%40123@localhost/insurance_dashboard'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)


@app.route("/")
def dashboard():
    return render_template("dashboard.html")


@app.route("/api/policies")
def policies():
    policies = Policy.query.all()

    result = []

    for p in policies:

        approved_claims = [c for c in p.claims if c.status == "Approved"]
        used_amount = sum(float(c.amount) for c in approved_claims)
        remaining = float(p.total_limit) - used_amount

        result.append({
            "id": p.id,
            "name": p.name,
            "category": p.category,
            "total_limit": float(p.total_limit),
            "used_amount": used_amount,
            "remaining_balance": remaining,
            "claims": [
                {
                    "date": str(c.claim_date),
                    "amount": float(c.amount),
                    "status": c.status
                }
                for c in p.claims
            ],
            "sub_limits": [
                {
                    "name": s.name,
                    "limit": float(s.limit_amount)
                }
                for s in p.sub_limits
            ],
            "riders": [
                {
                    "name": r.name,
                    "description": r.description
                }
                for r in p.riders
            ]
        })

    return jsonify(result)


if __name__ == "__main__":
    app.run(debug=True)