FROM python:3.11-slim

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# 1) mysqlclient build korar jonno system library
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc pkg-config default-libmysqlclient-dev \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

# 2) gunicorn chalar age migrate ar collectstatic
CMD ["sh", "-c", "python manage.py migrate --noinput && python manage.py collectstatic --noinput && gunicorn hospital_backend.wsgi:application --bind 0.0.0.0:8000 --workers 3"]