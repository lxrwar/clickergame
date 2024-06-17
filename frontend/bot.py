import telebot
from telebot.types import InlineKeyboardMarkup, InlineKeyboardButton
from dotenv import load_dotenv
import os

# Загружаем переменные окружения
load_dotenv()

API_TOKEN = os.getenv('API_TOKEN')

bot = telebot.TeleBot(API_TOKEN)

@bot.message_handler(commands=['start'])
def send_welcome(message):
    markup = InlineKeyboardMarkup()
    button = InlineKeyboardButton("Начать игру", url="https://t.me/ClickerGame1488_bot/CLG")
    markup.add(button)
    bot.send_message(message.chat.id, "Добро пожаловать в игру-кликер! Нажмите на кнопку ниже, чтобы начать игру.", reply_markup=markup)

if __name__ == '__main__':
    bot.polling(none_stop=True)
