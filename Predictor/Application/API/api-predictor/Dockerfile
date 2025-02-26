# Usa la imagen base de AWS Lambda con Python 3.9
FROM public.ecr.aws/lambda/python:3.9 AS builder

# Establece el directorio de trabajo
WORKDIR /app

# Copia archivos de Poetry
COPY pyproject.toml poetry.lock README.md /app/

# Instala Poetry
RUN pip install --no-cache-dir poetry==1.8

# Exporta las dependencias a un archivo requirements.txt
RUN poetry export -f requirements.txt --output requirements.txt --without-hashes

# Nueva imagen basada en AWS Lambda
FROM public.ecr.aws/lambda/python:3.9

# Establece el directorio de trabajo
WORKDIR /var/task

# Copia las dependencias desde la imagen anterior
COPY --from=builder /app/requirements.txt /var/task/requirements.txt

# Instala las dependencias en el entorno de Lambda
RUN pip install --no-cache-dir -r /var/task/requirements.txt && pip install mangum

# Copia el código de la aplicación
COPY app /var/task/app

COPY app/lambda_function.py /var/task/

# Copia las variables de entorno
COPY .env /var/task/.env

RUN pip install python-dotenv

# Comando de inicio para AWS Lambda
ENTRYPOINT [ "/var/runtime/bootstrap" ]
CMD [ "lambda_function.handler" ]