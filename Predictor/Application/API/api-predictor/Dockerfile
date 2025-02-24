FROM python:3.9-slim AS builder

WORKDIR /app

COPY pyproject.toml poetry.lock README.md /app/

RUN pip install --no-cache-dir poetry==1.8

RUN poetry export -f requirements.txt --output requirements.txt --without-hashes

FROM python:3.9-slim

WORKDIR /app

COPY --from=builder /app/requirements.txt /app/requirements.txt

RUN pip install --no-cache-dir -r /app/requirements.txt \
    && pip install gunicorn

COPY app /app/app

COPY .env /app/.env

RUN pip install python-dotenv

EXPOSE 8000

CMD ["gunicorn", "-k", "uvicorn.workers.UvicornWorker", "app.main:app", "--bind", "0.0.0.0:8000"]