FROM php:8.0-apache

# Download GIT for when download dependencies by Composer
RUN apt-get update \
    && apt-get install -y git \
    && apt-get clean

# Enable mod_rewrite from Apache Server
RUN a2enmod rewrite

# Override the default virtual host
COPY ./docker/myVirtualHost.conf /etc/apache2/sites-enabled/000-default.conf

# Install package manager Composer from Composer Image
COPY --from=composer /usr/bin/composer /usr/bin/composer
