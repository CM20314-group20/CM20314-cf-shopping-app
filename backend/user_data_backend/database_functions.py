from .models import User
from .database import SessionLocal


def add_user(user: User):
    with SessionLocal() as session:
        session.add(user)
        session.commit()