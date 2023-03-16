from typing import List

from sqlalchemy.orm import relationship, Mapped

from backend.user_data_backend.database import Base
from sqlalchemy import Column, String, Integer, ForeignKey


class Group(Base):
    __tablename__ = "groups"
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(ForeignKey("users.id"))
    user: Mapped[List["User"]] = relationship(back_populates="users")


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(100), unique=True, nullable=False)
    email = Column(String(80), unique=True, nullable=False)
    data_metric = Column(String(80), unique=True, nullable=False)
    group: Mapped["Group"] = relationship(back_populates="groups")
