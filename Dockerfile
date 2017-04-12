FROM python:2.7
MAINTAINER quandc <cqshinn92@gmail.com>

ADD . /opt/app
WORKDIR /opt/app
EXPOSE 8000
# RUN chmod +x run.sh
CMD python -m SimpleHTTPServer
