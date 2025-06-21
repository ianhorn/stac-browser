npm start -- --open --catalogUrl="http://localhost:8082"

npm run build -- --catalogUrl="https://spved5ihrl.execute-api.us-west-2.amazonaws.com/"

npm run build -- \
--catalogUrl="https://spved5ihrl.execute-api.us-west-2.amazonaws.com/" \
--historyMode=hash \
--pathPrefix="/browser"

docker run -p 8080:8080 -d --name stac-browser --restart=always \
-e SB_catalogUrl="http://ec2-52-88-114-187.us-west-2.compute.amazonaws.com" \
-e SB_catalogTitle="KyFromAbove Stac-Browser" \
-e SB_pathPrefix="/browser" \
stac-browser:v1 