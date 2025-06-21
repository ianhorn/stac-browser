npm start -- --open --catalogUrl="http://localhost:8082"

npm run build -- --catalogUrl="https://spved5ihrl.execute-api.us-west-2.amazonaws.com/"

npm run build -- \
--catalogUrl="https://spved5ihrl.execute-api.us-west-2.amazonaws.com/" \
--historyMode=hash \
--pathPrefix="/browser"

docker run -p 8080:8080 -d --restart=always \
-e SB_catalogUrl="http://0.0.0.0:8080" \
-e SB_catalogTitle="KyFromAbove Stac-Browser" stac-browser:v1