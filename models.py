from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Policy(db.Model):
    __tablename__ = "policies"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    category = db.Column(db.String(50))
    total_limit = db.Column(db.Numeric(12,2))

    claims = db.relationship("Claim", backref="policy")
    sub_limits = db.relationship("SubLimit", backref="policy")
    riders = db.relationship("Rider", backref="policy")


class Claim(db.Model):
    __tablename__ = "claims"

    id = db.Column(db.Integer, primary_key=True)
    policy_id = db.Column(db.Integer, db.ForeignKey("policies.id"))
    claim_date = db.Column(db.Date)
    amount = db.Column(db.Numeric(12,2))
    status = db.Column(db.String(20))


class SubLimit(db.Model):
    __tablename__ = "sub_limits"

    id = db.Column(db.Integer, primary_key=True)
    policy_id = db.Column(db.Integer, db.ForeignKey("policies.id"))
    name = db.Column(db.String(100))
    limit_amount = db.Column(db.Numeric(12,2))


class Rider(db.Model):
    __tablename__ = "riders"

    id = db.Column(db.Integer, primary_key=True)
    policy_id = db.Column(db.Integer, db.ForeignKey("policies.id"))
    name = db.Column(db.String(100))
    description = db.Column(db.String(255))