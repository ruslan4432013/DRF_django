FROM python:3.10

RUN apt-get update && apt-get install -y postgresql postgresql-contrib libpq-dev python3-dev

RUN pip3 install --upgrade pip

COPY ./src ./
RUN pip install pipenv

COPY Pipfile Pipfile.lock ./
RUN apt-get update && pipenv install --system --deploy --ignore-pipfile

COPY ./docker/wait-for-postgres.sh .
RUN chmod +x wait-for-postgres.sh
RUN pip install gunicorn