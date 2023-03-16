from backend.database import Base
from sqlalchemy import Column, String


class User(Base):
    __tablename__ = "Users"
    username = Column(String(100), unique=True, nullable=False, primary_key=True)
    email = Column(String(80), unique=True, nullable=False)
    data_metric = Column(String(80), unique=True, nullable=False)
