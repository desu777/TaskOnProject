from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from passlib.context import CryptContext
import sqlite3

app = FastAPI()

# Ustawienia haszowania haseł
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Połączenie z bazą SQLite
conn = sqlite3.connect("data/users.db", check_same_thread=False)  # Zmieniona ścieżka
c = conn.cursor()
c.execute("CREATE TABLE IF NOT EXISTS users (username TEXT, email TEXT, password TEXT)")
conn.commit()

# Modele danych
class RegisterUser(BaseModel):
    username: str
    email: str
    password: str

class LoginUser(BaseModel):
    email: str
    password: str

@app.post("/register")
def register_user(user: RegisterUser):
    hashed_password = pwd_context.hash(user.password)
    try:
        c.execute("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", 
                  (user.username, user.email, hashed_password))
        conn.commit()
        return {"message": "User registered successfully"}
    except sqlite3.IntegrityError:  # Obsługa wyjątków dla istniejącego użytkownika
        raise HTTPException(status_code=400, detail="User already exists")

@app.post("/login")
def login_user(user: LoginUser):
    c.execute("SELECT password FROM users WHERE email = ?", (user.email,))
    result = c.fetchone()
    if result and pwd_context.verify(user.password, result[0]):
        return {"message": "Login successful"}
    else:
        raise HTTPException(status_code=400, detail="Invalid credentials")
