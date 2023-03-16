from backend.user_data_backend import models
from backend.user_data_backend.database import engine

models.Base.metadata.create_all(bind=engine)
