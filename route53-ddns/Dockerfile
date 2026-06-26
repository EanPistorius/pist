FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY ddns.py .

CMD ["sh", "-c", "while true; do python ddns.py; sleep 600; done"]

