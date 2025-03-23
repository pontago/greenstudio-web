#!/bin/bash -l

set -eux

TEMP_SSH_PRIVATE_KEY_FILE='../private_key.pem'
TEMP_HTACCESS_FILE='../htaccess'

printf "%s" "$SSH_PRIVATE_KEY" >$TEMP_SSH_PRIVATE_KEY_FILE
chmod 600 $TEMP_SSH_PRIVATE_KEY_FILE

cat <<EOF > $TEMP_HTACCESS_FILE
SetEnv RECAPTCHA_SECRET_KEY $RECAPTCHA_SECRET_KEY
EOF

echo 'Uploading files to server...'

lftp <<EOS
set sftp:connect-program 'ssh -a -x -o StrictHostKeyChecking=no -i $TEMP_SSH_PRIVATE_KEY_FILE'
open sftp://$FTP_USERNAME:dummy@$FTP_SERVER
mirror --reverse --overwrite ./build/client/ $FTP_UPLOAD_DIRECTORY
mkdir -p ${FTP_UPLOAD_DIRECTORY}php
put ./backend/app/contact.php -o ${FTP_UPLOAD_DIRECTORY}php/
chmod 600 ${FTP_UPLOAD_DIRECTORY}php/contact.php
put $TEMP_HTACCESS_FILE -o ${FTP_UPLOAD_DIRECTORY}php/.htaccess
chmod 600 ${FTP_UPLOAD_DIRECTORY}php/.htaccess
close
EOS

echo 'Files uploaded successfully!'

exit 0