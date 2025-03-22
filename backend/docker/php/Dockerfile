FROM php:7.4-apache

RUN curl -sSL https://github.com/mailhog/mhsendmail/releases/download/v0.2.0/mhsendmail_linux_amd64 -o /usr/local/bin/mhsendmail \
    && chmod +x /usr/local/bin/mhsendmail 
RUN echo 'sendmail_path = "/usr/local/bin/mhsendmail --smtp-addr=mail:1025"' >> /usr/local/etc/php/conf.d/sendmail.ini