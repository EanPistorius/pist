FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY update_dns.py .

CMD ["sh", "-c", "while true; do python update_dns.py; sleep 600; done"]

