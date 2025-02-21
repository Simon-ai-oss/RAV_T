import tkinter as tk
from tkinter import messagebox
import gspread
from oauth2client.service_account import ServiceAccountCredentials
import threading
import time

# Function to connect to Google Sheets
def connect_to_sheet():
    time.sleep(5)  # Wait for 5 seconds
    try:
        scope = ['https://www.googleapis.com/auth/spreadsheets',
                 'https://www.googleapis.com/auth/drive']

        # Ensure the path to the 'ravt.json' file is correct
        credentials = ServiceAccountCredentials.from_json_keyfile_name('ravt.json', scope)
        client = gspread.authorize(credentials)

        sheet = client.open('RAV-T').sheet1  # Ensure the spreadsheet exists
        messagebox.showinfo("Connection", "Connected to Google Sheet successfully!")
        login_page(sheet)
    except gspread.exceptions.APIError as e:
        messagebox.showerror("API Error", f"Failed to connect to Google Sheets API: {e}")
    except FileNotFoundError as e:
        messagebox.showerror("File Not Found", f"Could not find credentials file: {e}")
    except Exception as e:
        messagebox.showerror("Error", f"Failed to connect to Google Sheets: {e}")

# Function to clear the window
def clear_window():
    for widget in window.winfo_children():
        widget.destroy()

# Login page
def login_page(sheet):
    clear_window()

    tk.Label(window, text="Login", font=("Arial", 20)).pack(pady=20)
    tk.Label(window, text="Username").pack()
    username_entry = tk.Entry(window)
    username_entry.pack(pady=5)

    tk.Label(window, text="Password").pack()
    password_entry = tk.Entry(window, show="*")
    password_entry.pack(pady=5)

    def login():
        username = username_entry.get().strip()
        password = password_entry.get().strip()

        if not username or not password:
            messagebox.showwarning("Input Error", "Please fill in all fields!")
            return

        try:
            records = sheet.get_all_records()
            for record in records:
                if record['Username'] == username and record['Password'] == password:
                    messagebox.showinfo("Success", f"Welcome, {username}!")
                    return
            messagebox.showerror("Login Failed", "Invalid username or password!")
        except Exception as e:
            messagebox.showerror("Error", f"Failed to fetch data: {e}")

    tk.Button(window, text="Login", command=login).pack(pady=10)
    tk.Button(window, text="Sign Up", command=lambda: signup_page(sheet)).pack()

# Signup page
def signup_page(sheet):
    clear_window()

    tk.Label(window, text="Sign Up", font=("Arial", 20)).pack(pady=20)
    tk.Label(window, text="Username").pack()
    username_entry = tk.Entry(window)
    username_entry.pack(pady=5)

    tk.Label(window, text="Password").pack()
    password_entry = tk.Entry(window, show="*")
    password_entry.pack(pady=5)

    tk.Label(window, text="Confirm Password").pack()
    confirm_password_entry = tk.Entry(window, show="*")
    confirm_password_entry.pack(pady=5)

    def signup():
        username = username_entry.get().strip()
        password = password_entry.get().strip()
        confirm_password = confirm_password_entry.get().strip()

        if not username or not password or not confirm_password:
            messagebox.showwarning("Input Error", "Please fill in all fields!")
            return

        if password != confirm_password:
            messagebox.showerror("Password Error", "Passwords do not match!")
            return

        try:
            records = sheet.get_all_records()
            for record in records:
                if record['Username'] == username:
                    messagebox.showerror("Signup Failed", "Username already exists!")
                    return

            sheet.append_row([username, password])
            messagebox.showinfo("Success", "Account created successfully!")
            login_page(sheet)
        except Exception as e:
            messagebox.showerror("Error", f"Failed to update data: {e}")

    tk.Button(window, text="Sign Up", command=signup).pack(pady=10)
    tk.Button(window, text="Back to Login", command=lambda: login_page(sheet)).pack()

# Main GUI window
window = tk.Tk()
window.title("Login and Signup")
window.geometry("400x300")
window.resizable(False, False)

tk.Label(window, text="Welcome!", font=("Arial", 20)).pack(pady=20)
tk.Label(window, text="Connecting to Google Sheets, please wait...", font=("Arial", 12)).pack(pady=20)

# Start the Google Sheets connection in a separate thread
threading.Thread(target=connect_to_sheet, daemon=True).start()

window.mainloop()
