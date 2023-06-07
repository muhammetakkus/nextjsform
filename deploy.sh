echo "building tedisyon posapp"
npm run build
echo deploying to server
scp -r .next/static/* root@89.252.140.252:/var/www/html/